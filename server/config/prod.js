// module.exports = {
//   'googleClientID': '743608264506-p682137v30fkhn4rh7puni9t7h47et9v.apps.googleusercontent.com',
//   'googleClientSecret': '-Dpm_sYHinlKRAOe1W6hsK1M',
//   'mongoURI': 'mongodb://shahmahdi11:shahmahdi11@ds141671.mlab.com:41671/emaily-prod',
//   'cookieKeys': 'anything'
// }

module.exports = {
  'googleClientID': process.env.GOOGLE_CLIENT_ID,
  'googleClientSecret': process.env.GOOGLE_CLIENT_SECRET,
  'mongoURI': process.env.MONGO_URI,
  'cookieKeys': process.env.COOKIE_KEY
}