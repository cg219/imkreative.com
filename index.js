const express = require('express');
const ghost = require('ghost');
const path = require('path');
const PORT = process.env.PORT || process.argv[2] || 5000;
const API = require('./api');

let app = express();
let ghostOptions = {
  config: path.join(__dirname, './src/ghost/ghost.config.js')
}

app.use(express.static(__dirname + "/public"));

app.get('/portfolio', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/portfolio.html'));
})

app.get('/art', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/art.html'));
})

app.get('/art/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/art.html'));
})

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/home.html'));
})
app.use('/api', API);

ghost(ghostOptions)
  .then(ghostServer => {
    // console.log("HO", ghostServer.config)
    app.use(ghostServer.config.paths.subdir, ghostServer.rootApp);
    ghostServer.start(app);
  })

app.listen(PORT, () => {
  console.log('Connected');
})