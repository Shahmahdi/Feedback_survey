const passport = require('passport');
const GoogleStrategy =require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  })
})

passport.use(new GoogleStrategy({
  'clientID': keys.googleClientID,
  'clientSecret': keys.googleClientSecret,
  'callbackURL': '/auth/google/callback',
  'proxy': true
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ googleId: profile.id }).then(existingUser => {
    if (existingUser) {
      // passport function done(sendErr, sendResultUser)
      done(null, existingUser)
    } else {
      new User({ googleId: profile.id }).save().then(user => done(null, user));
    }
  }).catch(e => {
    console.log(e);
  })
}));