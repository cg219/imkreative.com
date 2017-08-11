const ShopifyBuy = require('shopify-buy');
const config = require('./../../config');

exports = module.exports = ShopifyBuy.buildClient({
  accessToken: config.SHOPIFY_TOKEN,
  domain: config.SHOPIFY_DOMAIN,
  appId: config.SHOPIFY_ID
})