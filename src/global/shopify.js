const ShopifyBuy = require('shopify-buy');

exports = module.exports = ShopifyBuy.buildClient({
  accessToken: '42ce216dc22dce3ddf6f575e32e0fa11',
  domain: 'app-dev-5.myshopify.com',
  appId: '6'
})