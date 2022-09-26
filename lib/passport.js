const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { userAdmin } = require('../models');

async function authenticate(username, password, done) {
  try {
    const user = await userAdmin.authenticate({ username, password });
    /*
done adalah callback, parameter pertamanya adalah error,
jika tidak ada error, maka kita beri null saja.
Parameter keduanya adalah data yang nantinya dapat
kita akses di dalam req.user */
    return done(null, user);
  } catch (err) {
    return done(null, false, { message: err.message });
  }
}
passport.use(
  new LocalStrategy(
    { usernameField: 'username', passwordField: 'password' },
    authenticate
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) =>
  done(null, await userAdmin.findByPk(id))
);

module.exports = passport;
