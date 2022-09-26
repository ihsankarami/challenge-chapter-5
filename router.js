const Express = require('express');

const router = Express.Router();
const verifyRegister = require('./controllers/jwtRegisterController');
const verifySignIn = require('./controllers/jwtLoginContoller');
const authAdmin = require('./controllers/LocalAuthController');
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

// router for dashboard
////////////////////////
router.get('/dashboard', authAdmin.restrict, dashboardController.mainPage);

router.get(
  '/user-details/:id',
  authAdmin.restrict,
  dashboardController.userDetail
);

router.get('/create', async (req, res) => {
  res.render('create');
});

router.get('/save', authAdmin.restrict, dashboardController.saveData);

router.get('/edit-user/:id', authAdmin.restrict, dashboardController.editData);

router.get('/update/:id', authAdmin.restrict, dashboardController.updateData);

router.get('/delete', authAdmin.restrict, dashboardController.deleteData);

module.exports = router;
