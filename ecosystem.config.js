module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'imkreative',
      script    : 'index.js',
      env: {
        CONTENTFUL_API_TOKEN: '2b7cdd35d7354ddf0deff15ad61b1cc3067e85a18732fed0e943fe40be112898',
        CONTENTFUL_SPACE_ID: 'v5ehwolqq5uw',
        NODE_ENV: 'development'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'kreativemente',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : __dirname,
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    },
    development : {
      user : 'kreativemente',
      host : '127.0.0.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : __dirname,
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env development',
      env  : {
        NODE_ENV: 'development'
      }
    }
  }
};
