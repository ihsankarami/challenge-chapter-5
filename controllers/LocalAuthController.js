const { userAdmin } = require('../models');
const passport = require('../lib/passport');

module.exports = {
  register: (req, res, next) => {
    userAdmin
      .register(req.body)
      .then(() => {
        res.redirect('/login-admin');
      })
      .catch((err) => next(err));
  },

  login: passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login-admin',
    failureFlash: true,
  }),
};
