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

let app = express();
let redis = new Redis();

app.use(session({
  store: new RedisStore(),
  secret: 'Yoanie has huge eyeballs.',
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
        if(req.body.username == 'kreativemente') {
          redis.set('kreativemente', req.body.password);
          req.session.admin = true;
          return res.send('/');
        }
        
        return res.send('/login?fail=true');
      }

      return res.send('/login?fail=true');
    })
})

app.post('/extract', checkAdmin, (req, res) => {
  let opts = {
    fields: ['email'],
    flatten: true,
    hasCSVColumnTitle: false,
    data: req.body.emails
  }
  
  j2c(opts, (err, csv) => {
    let pathToCSV = `${__dirname}/public/emails.csv`;
    let file = fs.writeFileSync(pathToCSV, csv);

    res.send('/emails.csv');
  });
  
})

if(process.env.NODE_ENV == "production"){
  app.listen(PORT, '216.70.82.169', () => {
    console.log('Connected on Production');
    console.log('PORT: ', PORT);
  })

}
else{
  app.listen(PORT, () => {
    console.log('Connected on Dev');
  })
}