const models = require('./models');

module.exports = {
  async mainPage(req, res) {
    const searchName = req.query.searchName;
    let userGames;

    if (!searchName) {
      userGames = await models.userGame.findAll({
        include: [models.userBio, models.userGameHistory],
      });
    } else {
      userGames = await models.userGame.findAll({
        where: {
          name: {
            [Op.iLike]: `%${searchName}%`,
          },
        },
      });
    }

    res.render('dash-main', {
      userGames: userGames,
      searchName: searchName,
    });
  },

  async userDetail(req, res) {
    const { id } = req.params;
    let users;

    users = await models.userGame.findOne({
      where: {
        id: id,
      },
      include: [models.userBio, models.userGameHistory],
    });
    console.log(users.userGameHistories);
    res.render('detail', {
      users: users,
    });
  },

  async saveData(req, res) {
    const { username, password, dateOfBirth, birthPlace, gender } = req.body;
    const createUser = await models.userGame.create({
      username: username,
      password: password,
    });
    await models.userBio.create({
      userGameId: createUser.id,
      dateOfBirth: dateOfBirth,
      birthPlace: birthPlace,
      gender: gender,
    });
    res.redirect('/dashboard');
  },

  async editData(req, res) {
    const { id } = req.params;
    users = await models.userGame.findOne({
      where: {
        id: id,
      },
      include: [models.userBio],
    });
    res.render('edit', {
      users: users,
    });
  },
  async updateData(req, res) {
    const { id } = req.params;
    const users = await models.userGame.findOne({
      where: {
        id: id,
      },
    });

    const bio = await models.userBio.findOne({
      where: {
        userGameId: id,
      },
    });
    await users.update(req.body);
    await bio.update(req.body);
    res.redirect('/dashboard');
  },

  async deleteData(req, res) {
    const { id } = req.params;
    await models.userBio.destroy({
      where: {
        id: id,
      },
    });
    await models.userGameHistory.destroy({
      where: {
        id: id,
      },
    });

    await models.userGame.destroy({
      where: {
        id: id,
      },
    });
    res.redirect('/dashboard');
  },
};
