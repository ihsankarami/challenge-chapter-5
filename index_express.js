const Express = require('express');

const fs = require('fs');
const { Op } = require('sequelize');
const models = require('./models');

//config
const app = Express();

app.use(
  Express.urlencoded({
    extended: false,
  })
);

app.set('view engine', 'ejs');
// app.use(Express.json());

//render static file
app.use(Express.static('public'));

app.get('/', (req, res) => {
  res.render('login');
});

// read data from userData.json
let data = fs.readFileSync('userData.json');
let userData = JSON.parse(data);
console.log(userData);

// login user
app.post('/user', (req, res) => {
  if (
    req.body.username == userData.username &&
    req.body.password == userData.password
  ) {
    console.log('login correct');
    res.redirect('/index');
  }
  if (req.body.username == 'admin' && req.body.password == 'admin') {
    console.log('login as admin');
    res.redirect('/dashboard');
  } else if (
    req.body.username == userData.username &&
    req.body.password != userData.password
  ) {
    console.log('invalid password');
    res.end('invalid password');
  } else if (req.body.username != userData.username) {
    console.log('invalid username');
    res.end('invalid password');
  }
});

app.get('/dashboard', async (req, res) => {
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
});

app.get('/user-details/:id', async (req, res) => {
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
});

app.get('/create', async (req, res) => {
  res.render('create');
});

app.post('/save', async (req, res) => {
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
});

app.get('/edit-user/:id', async (req, res) => {
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
});

app.post('/update/:id', async (req, res) => {
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
});

app.get('/delete/:id', async (req, res) => {
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
});

app.get('/index', (req, res) => {
  res.render('index');
});

app.get('/game-page', (req, res) => {
  res.render('game-page');
});

models.sequelize
  .authenticate()
  .then(() => {
    app.listen(4001, () => {
      console.log('listening port 4001');
    });
  })
  .catch(console.log);
