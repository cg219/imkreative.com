const config = require('./config');
const Router = require('express').Router();
const request = require('request');
const Redis = require('ioredis');
const Moment = require('moment');
const MAIN_CALL = `https://cdn.contentful.com/spaces/${config.CONTENTFUL_SPACE_ID}/entries?access_token=${config.CONTENTFUL_API_TOKEN}`;
const ENTRIES_CALL = `${MAIN_CALL}&include=1&content_type=site&order=-fields.date`;
const ART_CALL = `${MAIN_CALL}&include=1&content_type=art&order=-fields.date`;
const SHOWS_CALL = `${MAIN_CALL}&include=1&content_type=show&order=-fields.date`;
const CATS_CALL = `${MAIN_CALL}&include=1&content_type=categories`;
const EXPIRATION = 60 * 60;
const mailgun = require('mailgun-js')({
  apiKey: config.MAILGUN_KEY,
  domain: config.MAILGUN_DOMAIN
})

let redis = new Redis({
  hostname: config.REDIS_HOST,
  port: config.REDIS_PORT,
  password: config.REDIS_PASS
});
let extractAssetsForEntries = function(items, assets) {
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

let extractAssetsForArts = function(items, assets) {
  // Return a formatted Data Object with necessary information.
  return items.map((item, index, array) => {
    let i = 0;
    let formattedItem = {
      title: item.fields.title,
      description: item.fields.description,
      date: item.fields.date,
      id: item.fields.id
    }

    for(i; i < assets.length; i++) {
      // Check for the correct matching asset.
      if(assets[i].sys.id === item.fields.image.sys.id) {
        formattedItem['image'] = assets[i].fields.file.url;
        break;
      }
    }

    return formattedItem;
  })
}

let extractAssetsForShows = function(items, assets) {
  // Return a formatted Data Object with necessary information.
  return items.map((item, index, array) => {
    let i = 0;
    let formattedItem = {
      title: item.fields.title,
      venue: item.fields.venue,
      date: item.fields.date,
      location: item.fields.locationName,
      link: item.fields.link,
      type: item.fields.type,
      coordinates: item.fields.coordinates

    }

    for(i; i < assets.length; i++) {
      // Check for the correct matching asset.
      if(item.fields.flyer && assets[i].sys.id === item.fields.flyer.sys.id) {
        formattedItem['flyer'] = assets[i].fields.file.url;
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
        let formattedData = extractAssetsForEntries(parsedReturn.items, parsedReturn.includes.Asset);

        redis.set('entries', JSON.stringify(formattedData), 'ex', EXPIRATION);
        res.json(formattedData);
      })
    })

})

Router.get('/arts', (req, res) => {
  redis.get('arts')
    .then(result => {
      if(result) {
        console.log('From Redis');
        return res.json(JSON.parse(result));
      }

      console.log('Calling Contentful');

      request.get(ART_CALL, (error, response, body) => {
        let parsedReturn = JSON.parse(body);
        let formattedData = extractAssetsForArts(parsedReturn.items, parsedReturn.includes.Asset);

        redis.set('arts', JSON.stringify(formattedData), 'ex', EXPIRATION);
        res.json(formattedData);
      })
    })

})

Router.get('/shows', (req, res) => {
  redis.get('shows')
    .then(result => {
      if(result) {
        console.log('From Redis');
        return res.json(JSON.parse(result));
      }

      console.log('Calling Contentful');

      request.get(SHOWS_CALL, (error, response, body) => {
        let parsedReturn = JSON.parse(body);
        let assets = parsedReturn.includes ? parsedReturn.includes.Asset : [];
        let formattedData = extractAssetsForShows(parsedReturn.items, assets);

        redis.set('shows', JSON.stringify(formattedData), 'ex', EXPIRATION);
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

Router.post('/send-email', (req, res) => {
  const data = {
    from: `${req.body.name}<${req.body.email}>`,
    to: 'me@artbymente.com',
    subject: `Message from Artbymente`,
    text: req.body.message
  }

  mailgun.messages().send(data, (error, response) => {
    res.json(response);
  })
})

Router.post('/mailgun-hook', (req, res) => {
  console.log(req.body);
  console.log("HIT");
})

Router.post('/save-email', (req, res) => {
  mailgun.lists('artbymente@mailer.imkreative.com').members().add({
    members: [{
      address: req.body.email,
      name: req.body.fname
    }],
    subscribed: true
  }, function(err, response){
    res.json({status: 200});
  })
})

module.exports = Router;
