const Path = require('path-parser').default;
const { URL } = require('url');
const { compact, uniqBy } = require('lodash');
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emialTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {

  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({ recipients: false });
    res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send("Thanks for voting.");
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const allEvents = req.body;
    const pathObj = new Path('/api/surveys/:surveyId/:choice');
    const filteredEvents = allEvents.map(event => {
      const path = new URL(event.url).pathname;
      const match = pathObj.test(path);
      if (match) {
        return {
          email: event.email,
          surveyId: match.surveyId,
          choice: match.choice
        }
      }
    });
    const events = uniqBy(compact(filteredEvents), 'email', 'surveyId');
    events.map(event => {
      Survey.updateOne({
        _id: event.surveyId,
        recipients: {
          $elemMatch: { email: event.email, responded: false }
        }
      }, {
          $inc: { [event.choice]: 1 },
          $set: { 'recipients.$.responded': true },
          lastResponded: new Date()
        }).exec();
    })
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSend: Date.now()
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (error) {
      res.status(422).send(error);
    }
  });
}