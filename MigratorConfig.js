// var config = require('./node_modules/ghost/core/server/config')
const path = require('path');

/**
 * knex-migrator can be used via CLI or within the application
 * when using the CLI, we need to ensure that our global overrides are triggered
 */
require('./node_modules/ghost/core/server/overrides');

// module.exports = {
//     currentVersion: ghostVersion.safe,
//     database: config.get('database'),
//     migrationPath: config.get('paths:migrationPath')
// };

module.exports = {
    database: {
      client: 'mysql',
      connection: {
        // filename: path.join(__dirname, '/content/data/ghost-dev.db')
        host: '127.0.0.1',
        user: 'kreativemente',
        password: '',
        database: 'ghostdev'
      },
      debug: false
    },
    migrationPath: './node_modules/ghost/core/server/data/migrations',
    currentVersion: '1.0.2'
}
