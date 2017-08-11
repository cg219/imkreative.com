const config = require('./config');
const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || process.argv[2] || 5001;
const API_URI = process.env.API_URI || process.argv[3] || 'http://localhost:5000/api';
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const Redis = require('ioredis');
const axios = require('axios');
const j2c = require('json2csv');
const mailgun = require('mailgun-js')({
  apiKey: config.MAILGUN_KEY,
  domain: config.MAILGUN_DOMAIN
})

let app = express();
let redis = new Redis();

console.log(process.env);

app.use(session({
  store: new RedisStore(),
  secret: process.env.REDIS_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let checkAdmin = (req, res, next) => {
  if(req.session && req.session.admin) {
    return next();
  }

  return res.redirect('/login');
}

app.get('/', checkAdmin, (req, res) => {
  console.log("Admin");
  res.sendFile(path.resolve(__dirname, './views/admin.html'));
})

app.get('/login', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/admin.html'));
})

app.post('/send-newsletter', checkAdmin, (req, res) => {
  const data = {
    from: `Mente Gee<noreply@imkreative.com>`,
    to: req.body.email,
    subject: req.body.subject,
    html: req.body.html,
    "o:tracking": 'yes',
    "o:tag": req.body.tags || null
  }

  let response = {
    error: false,
    errorMessage: null,
    errorCode: null,
    mailgun: null
  }

  redis.hget('newsletters', req.body.uuid)
    .then(result => {
      let promise = new Promise((resolve, reject) => {
        if(result) {
          response.errorMessage = 'UUID already exists';
          response.errorCode = 1000;
          reject();
        }

        resolve();
      })
      
      return promise;
    })
    .then(result => {
      redis.hset('newsletters', req.body.uuid, data.html);
      return mailgun.messages().send(data);
    })
    .then(result => {
      response.mailgun = result;
      res.json(response);
    })
    .catch(error => {
      response.error = true;
      res.json(response);
    })
})

app.get('/emails', checkAdmin, (req, res) => {
  axios.get(`${API_URI}/get-email-list`)
    .then(data => {
      res.json(data.data.emails);
    })
})

app.post('/login', (req, res) => {
  console.log("Loggin In");
  redis.get(req.body.username)
    .then(result => {
      if(result && result == req.body.password) {
        req.session.admin = true;
        return res.send('/');
      }

      res.send('/login?fail=true');
    })
})

app.post('/logout', (req, res) => {
  console.log("Loggin Out");

  req.session.destroy();
  res.end();
})

app.post('/signup', (req, res) => {
  console.log("Signing Up");
  redis.get(req.body.username)
    .then(result => {
      if(!result) {
        if(req.body.username == config.ADMIN_USER) {
          redis.set(config.ADMIN_USER, req.body.password);
          req.session.admin = true;
          return res.send('/');
        }
        
        return res.send('/login?fail=true');
      }

      return res.send('/login?fail=true');
    })
})

if(process.env.NODE_ENV == "production"){
  app.listen(PORT, process.env.PROD_IP, () => {
    console.log('Connected on Production');
    console.log('PORT: ', PORT);
  })

}
else{
  app.listen(PORT, () => {
    console.log('Connected on Dev');
  })
}