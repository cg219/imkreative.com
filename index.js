const config = require('./config');
const express = require('express');
const ghost = require('ghost');
const path = require('path');
const PORT = process.env.PORT || process.argv[2] || 5000;
const API = require('./api');
const bodyParser = require('body-parser');
const Redis = require('ioredis');
const ghostUtils = require('./node_modules/ghost/core/server/utils');

let app = express();
let redis = new Redis();

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/content"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/portfolio', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/portfolio.html'));
})

app.get('/art', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/art.html'));
})

app.get('/art/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/art.html'));
})

app.get('/newsletter/:uuid', (req, res) => {
  redis.hget('newsletters', req.params.uuid)
    .then(result => {
      if(result) {
        res.send(result);
      }
      else {
        res.status(404).send(`Sorry, we can't find what you are looking for`);
      }
    })
})

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/home.html'));
})
app.use('/api', API);

ghost()
  .then(ghostServer => {
    app.use(ghostUtils.url.getSubdir(), ghostServer.rootApp);
    ghostServer.start(app);
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
