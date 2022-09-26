const Express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const fs = require('fs');
const { Op } = require('sequelize');
const models = require('./models');
const verifySignUpController = require('./controllers/verifyRegisterUserGame');
const verifySignIn = require('./controllers/verifySignUserGame');

const authAdmin = require('./controllers/LocalauthController');
const app = Express();

const restrict = require('./middleware/restrict');

app.use(Express.urlencoded({ extended: false }));

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  })
);
const passport = require('./lib/passport');

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.set('view engine', 'ejs');
// app.use(Express.json());

//render static file
app.use(Express.static('public'));

// read data from userData.json
// let data = fs.readFileSync('userData.json');
// let userData = JSON.parse(data);

//register
app.get('/register-admin', (req, res) => res.render('register'));
app.post('/register-admin', authAdmin.register);

app.get('/register-user', (req, res) => res.render('registerUser'));
app.post(
  '/register-user',

  verifySignUpController.signup
);

//login
app.get('/login-user', (req, res) => {
  res.render('loginUser');
});
app.get('/login-admin', (req, res) => {
  res.render('login');
});
app.post('/login', authAdmin.login);
app.post('/login-user', verifySignIn.login);

app.get('/dashboard', restrict, async (req, res) => {
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
