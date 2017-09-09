const fs = require('fs');
const path = require('path');
const ghostSample = require('./config.ghost.sample');

//Create Frontend Config File

let configRS = fs.createReadStream(path.join(__dirname, 'config.sample.js'));
let configWS = fs.createWriteStream(path.join(__dirname, 'config.js'));

configRS.on('error', error => console.error('Error Reading Sample Config File'));
configWS.on('error', error => console.error('Error Writing Config File'));
configWS.on('close', () => console.log('Frontend config file created'));

configRS.pipe(configWS);

//Create Development JSON for Ghost

const devProps = {
  url: "http://localhost:5000/blog",
  content: "./../../content/",
  mail: {
    user: "postmaster@sandbox960a592ce0924897bcec3bdc1afbed40.mailgun.org",
    pass: "0czsewhexlj7"
  },
  database: {
    host: "127.0.0.1",
    user: "kreativemente",
    pass: "",
    name: "ghostdev"
  },
  server: {
    host: "127.0.0.1",
    port: "5000"
  }
}

fs.writeFile('config.development.json', JSON.stringify(ghostSample.get(devProps), null, 2), err => {
  if(err) {
    console.error(err);
  }

  console.log('config.development.json created');
})

//Create Production JSON for Ghost

const prodProps = {
  url: process.env.BLOG_URL,
  content: process.env.CONTENT_PATH,
  mail: {
    user: process.env.GHOST_MAIL_USER,
    pass: process.env.GHOST_MAIL_PASS
  },
  database: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    pass: process.env.DATABASE_PASS,
    name: process.env.DATABASE_NAME
  },
  server: {
    host: process.env.SERVER_HOST,
    port: process.env.PORT
  }
}

fs.writeFile('config.production.json', JSON.stringify(ghostSample.get(prodProps), null, 2), err => {
  if(err) {
    console.error(err);
  }

  console.log('config.production.json created');
})