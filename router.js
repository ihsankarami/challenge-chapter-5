const Express = require('express');

const router = Express.Router();
const verifyRegister = require('./controllers/jwtRegisterController');
const verifySignIn = require('./controllers/jwtLoginContoller');
const authAdmin = require('./controllers/LocalAuthController');
const restrict = require('./middleware/restrict');
const joinCtrl = require('./controllers/game/join');
const submitCtrl = require('./controllers/game/submit');
const statusCtrl = require('./controllers/game/status');

const authUser = require('./middleware/jwtAuth');
const dashboardController = require('./controllers/adminDashboarController');

//register as admin using local strategy
router.get('/register-admin', (req, res) => res.render('register'));
router.post('/register-admin', authAdmin.register);

//register as user using jwt
router.get('/register-user', (req, res) => res.render('registerUser'));
router.post('/register-user', verifyRegister.signup);

// login as admin using local strategy
router.get('/login-admin', (req, res) => {
  res.render('login');
});
router.post('/login', authAdmin.login);

//login as user using jwt
router.get('/login-user', (req, res) => {
  res.render('loginUser');
});
router.post('/login-user', verifySignIn.login);

router.get('/index', authUser, (req, res) => {
  res.render('index');
});

//game suit endpoint
router.get('/game-page', authUser, (req, res) => {
  res.render('game-page');
});
router.post('/game-page/join', joinCtrl.join);

router.post('/game-page/submit', submitCtrl.submit);

router.get('/game-page/status/:roomCode', statusCtrl.status);

// router for dashboard
////////////////////////
router.get('/dashboard', restrict, dashboardController.mainPage);

router.get('/user-details/:id', restrict, dashboardController.userDetail);

router.get('/create', restrict, async (req, res) => {
  res.render('create');
});

router.get('/save', restrict, dashboardController.saveData);

router.get('/edit-user/:id', restrict, dashboardController.editData);

router.get('/update/:id', restrict, dashboardController.updateData);

router.get('/delete', restrict, dashboardController.deleteData);

module.exports = router;
