const models = require('../models');
const bcrypt = require('bcrypt');

//handle if username is duplicated and create new user
module.exports = {
  async signup(req, res) {
    try {
      const { username, password } = req.body;
      const hashPassword = bcrypt.hashSync(password, 8);
      await models.userGame.create({
        username: username,
        password: hashPassword,
      });
    } catch (err) {}

    res.redirect('/login-user');
  },
};
