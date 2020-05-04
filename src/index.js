
var bot = require('./bot.js');
var express = require('express');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var session = require('express-session');


// Constants
const PORT = 4000;
const ZEROS = 4;


// Functions
const generateChallenge = (req) => {
  const challenge = crypto.randomBytes(2).toString('hex');
  req.session.challenge = challenge;
  req.session.zeros = ZEROS;

  return {
    challenge,
    zeros: ZEROS
  };
}

const checkPow = (challenge, zeros, userAnswer) => {
  let hash = crypto.createHash('md5').update(
      challenge + userAnswer.toString()
  ).digest('hex');
  console.log('checked Pow', hash);
  return hash.substr(0, zeros) === "0".repeat(zeros);
}

// Configuration
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(session({
    secret: crypto.randomBytes(24).toString('hex'),
    resave: false,
    saveUninitialized: false
}));


// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/contact', (req, res) => {
  const { challenge, zeros } = generateChallenge(req);
  res.render('contact', { challenge, zeros });
});

app.post('/contact', (req, res) => {
  var errors = {};
  const body_pow = req.body.pow || "";

  console.log(checkPow(req.session.challenge, req.session.zeros, body_pow));
  console.log(req.session.challenge, req.session.zeros, body_pow);

  if(checkPow(req.session.challenge, req.session.zeros, body_pow)) {
    errors['captcha'] = 'Captcha is wrong.';
  }

  if(req.body.url) {
    const url = new URL(req.body.url);
    if(url.host !== 'localhost:4000') {
      errors['url'] = 'URL needs to be from the same site.';
    } else {
      bot.runBot(url.href);
    }
  } else {
    errors['url'] = 'URL cannot be empty.';
  }
  const { challenge, zeros } = generateChallenge(req);

  res.render('contact', { errors, challenge, zeros });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running...`);
});
