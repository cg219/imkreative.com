const Router = require('express').Router();
const request = require('request');
const Redis = require('ioredis');
const Moment = require('moment');
const MAIN_CALL = `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/entries?access_token=${process.env.CONTENTFUL_API_TOKEN}`;
const ENTRIES_CALL = `${MAIN_CALL}&include=1&content_type=site&order=-fields.date`;
const CATS_CALL = `${MAIN_CALL}&include=1&content_type=categories`;
const EXPIRATION = 60 * 60;

let redis = new Redis();
let extractAssets = function(items, assets) {
  // Return a formatted Data Object with necessary information.
  return items.map((item, index, array) => {
    let i = 0;
    let formattedItem = {
      link: item.fields.url,
      client: item.fields.client,
      agency: item.fields.agency,
      roles: item.fields.role,
      tech: item.fields.technology,
      isActive: item.fields.active,
      name: item.fields.name,
      date: Moment(item.fields.date, 'YYYY-MM-DD').format()
    }

    for(i; i < assets.length; i++) {
      // Check for the correct matching asset.
      if(assets[i].sys.id === item.fields.thumbnail.sys.id) {
        formattedItem['thumbnail'] = assets[i].fields.file.url;
        break;
      }
    }

    return formattedItem;
  })
}

Router.get('/entries', (req, res) => {
  redis.get('entries')
    .then(result => {
      if(result) {
        console.log('From Redis');
        return res.json(JSON.parse(result));
      }
      
      console.log('Calling Contentful');

      request.get(ENTRIES_CALL, (error, response, body) => {
        let parsedReturn = JSON.parse(body);
        let formattedData = extractAssets(parsedReturn.items, parsedReturn.includes.Asset);

        redis.set('entries', JSON.stringify(formattedData), 'ex', EXPIRATION);
        res.json(formattedData);
      })
    })

})

Router.get('/cats', (req, res) => {
  redis.get('cats')
    .then(result => {
      if(result) {
        console.log('From Redis');
        return res.json(JSON.parse(result));
      }
      
      console.log('Calling Contentful');

      request.get(CATS_CALL, (error, response, body) => {
        redis.set('entries', body, 'ex', EXPIRATION);
        res.json(JSON.parse(body));
      })
    })

})

module.exports = Router;