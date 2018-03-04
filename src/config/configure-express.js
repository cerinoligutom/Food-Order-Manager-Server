const compression = require('compression');

module.exports = (app) => {
  app.set('host', process.env.HOST || 'localhost');
  app.set('port', process.env.PORT || 3000);

  app.use(compression());
};
