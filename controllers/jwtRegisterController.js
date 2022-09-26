const models = require('../models');
const bcrypt = require('bcrypt');

//handle if username is duplicated and create new user
module.exports = {
  //   checkDuplicateUserName(req, res, next) {
  //     userGame
  //       .findOne({
  //         where: {
  //           username: req.body.username,
  //         },
  //       })
  //       .then((user) => {
  //         if (user) {
  //           res.status(400).send({
  //             auth: false,
  //             username: req.body.username,
  //             message: 'Error',
  //             errors: 'username is already taken!',
  //           });
  //           return;
  //         }
  //         next();
  //       });
  //   },

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
