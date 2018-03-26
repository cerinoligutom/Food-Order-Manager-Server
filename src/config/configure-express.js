import compression from 'compression';
import bodyParser from 'body-parser';
import statusMonitor from 'express-status-monitor';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

import setRoutes from '../router';
import setPassport from './passport';


module.exports = (app, pgPool) => {
  app.set('host', process.env.HOST || 'localhost');
  app.set('port', process.env.PORT || 3000);

  let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a'});

  app.use(morgan('dev', {
    skip: (req, res) => res.statusCode < 400,
    stream: accessLogStream
  }));

  app.use(cors());
  app.use(statusMonitor());
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  setPassport(app, pgPool);

  setRoutes(app, pgPool);
};
