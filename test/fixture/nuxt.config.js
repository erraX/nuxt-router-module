const { join } = require('path');

module.exports = {
  routerModule: {
    path: join(__dirname, 'routes'),
    fileName: 'index.js',
    routerConfigs: {
      linkActiveClass: 'custom-active',
      linkExactActiveClass: 'custom-exact-active',
    },
  },
  modules: [{ handler: require('../../lib/module') }],
};
