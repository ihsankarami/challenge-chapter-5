import Express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';

//config
const app = Express();
const port = process.env.PORT || 4001;
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.use(Express.json());

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
    console.log('Correct login');
    res.redirect('/index');
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

app.get('/index', (req, res) => {
  res.render('index');
});

app.get('/game-page', (req, res) => {
  res.render('game-page');
});

app.listen(port);
