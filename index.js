const express = require('express');
const ghost = require('ghost');
const Redis = require('ioredis');
const path = require('path');
const PORT = process.env.PORT || process.argv[2] || 5000;
const API = require('./api');

let app = express();
let redis = new Redis();

app.use(express.static(__dirname + "/public"));

app.get('/portfolio', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/portfolio.html'));
})
app.use('/api', API);

app.listen(PORT, () => {
  console.log('Connected');
})