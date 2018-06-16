require('./node_modules/ghost/core/server/overrides');

module.exports = {
  database: {
    client: 'mysql',
    connection: {
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      charset: 'utf8',
      database: process.env.DATABASE_NAME
    }
  },
  migrationPath: './node_modules/ghost/core/server/data/migrations',
  currentVersion: '1.0.2'
}