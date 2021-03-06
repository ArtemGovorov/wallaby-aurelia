
/* eslint-env node  */
/* global requirejs */

module.exports = function () {


  var path = require('path');
  var aureliaJson = require('./aurelia_project/aurelia.json');

  return {

    debug: true,

    files: [
      { pattern: 'node_modules/bluebird/js/browser/bluebird.core.js', instrument: false },
      { pattern: 'scripts/require.js', instrument: false },
      { pattern: 'src/**/*.ts', load: false },
      { pattern: 'test/unit/setup.ts', load: false }
    ],

    tests: [
      { pattern: 'test/unit/**/*.spec.ts', load: false }
    ],

    env: {
      kind: 'electron'
    },

    middleware: function (app, express) {
      app.use('/node_modules',
        express.static(path.join(__dirname, 'node_modules')));
    },

    setup: (function (wallaby) {
      wallaby.delayStart();

      requirejs.config({
        paths: {
          // paths
        }
      });

      require(['/test/unit/setup.js'].concat(wallaby.tests), function () {
        wallaby.start();
      });
    }).toString()
      .replace(
      '// paths',
      aureliaJson.build.bundles[1].dependencies.reduce(function (prev, curr) {
        var moduleName, modulePath;
        if (curr.path) {
          moduleName = curr.name;
          modulePath = '/' + path.relative(
            __dirname,
            path.resolve(__dirname, 'aurelia_project', curr.path))
            .split('\\').join('/');
          if (curr.main) {
            modulePath += '/' + curr.main;
          }
        }
        else {
          moduleName = curr;
          modulePath = '/node_modules/' + moduleName + '/dist/amd/' + moduleName;
        }
        return prev + '"' + moduleName + '": ' + '"' + modulePath + '",';
      }, ''))
  };
};
