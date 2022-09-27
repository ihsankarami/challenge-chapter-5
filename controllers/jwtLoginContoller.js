const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//  handle setiap user yang melakukan request login

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;

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
      try {
        const token = jwt.sign((user_id = user.id), (secret = 'ini rahasia'));

        const payload = {
          user_id: user.id,
          token: token,
        };
        return (
          res
            .cookie('access_token', payload, {
              httpOnly: true,
            })
            .status(200),
          res.status(200).json(payload)
          // res.redirect('/index')
        );
      } catch {}
    }
  },
};
