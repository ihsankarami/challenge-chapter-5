const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//  handle setiap user yang melakukan request login

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;
    console.log(username);
    const user = await models.userGame.findOne({
      where: {
        username: username,
      },
    });
    if (!user) {
      return res.render('/login-user', { status: 'user not found' });
    }
    const passwordCheck = bcrypt.compareSync(password, user.password);
    if (!passwordCheck) {
      return res.render('/login-user', { status: 'invalid password' });
    } else {
      const token = jwt.sign((user_id = user.id), (secret = 'ini rahasia'));
      const payload = {
        user_id: user.id,
        token: token,
      };
      return res.status(200).json(payload);
    }
  },

  //   async login(req, res) {
  //    await models.userGame
  //       .findOne({
  //         where: {
  //           username: req.body.username,
  //         },
  //       })
  //       checkPassword = (password) =>
  //         bcrypt
  //           .compareSync(password, this.password)
  //           .then((user) => {
  //             if (!user) {
  //               return res.status(404).send({
  //                 auth: false,
  //                 username: req.body.username,
  //                 accessToken: null,
  //                 message: 'Error',
  //                 errors: 'User Not Found.',
  //               });
  //             }

  //             const passwordIsValid = bcrypt.compareSync(
  //               req.body.password,
  //               user.password
  //             );
  //             if (!passwordIsValid) {
  //               return res.status(401).send({
  //                 auth: false,
  //                 password: req.body.password,
  //                 accessToken: null,
  //                 message: 'Error',
  //                 errors: 'Invalid Password!',
  //               });
  //             }

  //             const token =
  //               'Bearer ' +
  //               jwt.sign(
  //                 {
  //                   username: req.body.username,
  //                 },
  //                 config.secret,
  //                 {
  //                   expiresIn: 86400, //24h expired
  //                 }
  //               );

  //             res.status(200).send({
  //               auth: true,
  //               username: req.body.username,
  //               accessToken: token,
  //               message: 'Error',
  //               errors: null,
  //             });
  //           })
  //           .catch((err) => {
  //             res.status(500).send({
  //               auth: false,
  //               username: req.body.username,
  //               accessToken: null,
  //               message: 'Error',
  //               errors: err,
  //             });
  //           });
  //   },
};
