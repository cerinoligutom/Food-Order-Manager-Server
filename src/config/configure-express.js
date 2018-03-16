const compression = require('compression');
const bodyParser = require('body-parser');
const statusMonitor = require('express-status-monitor');
import cors from 'cors';

module.exports = (app) => {
  app.set('host', process.env.HOST || 'localhost');
  app.set('port', process.env.PORT || 3000);

  app.use(cors());
  app.use(statusMonitor());
  app.use(compression());
  app.use(bodyParser.json());
};
