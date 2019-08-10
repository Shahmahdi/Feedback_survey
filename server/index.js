const express = require('express');
const app = express();
const mongoose = require('mongoose');
const keys = require('./config/keys');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./model/User');
require('./services/passport');
const authRoutes = require('./routes/authRoutes');

mongoose.connect(keys.mongoURI);

app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,  // 30 days cookie
  keys:[keys.cookieKeys]
}));

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running..`);
});