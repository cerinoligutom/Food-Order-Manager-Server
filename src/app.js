/* eslint-disable no-console */
import express from 'express';
import graphqlHTTP from 'express-graphql';
import chalk from 'chalk';

import schema from './graphql/schema';
import getDataloaders from './graphql/dataloaders';
import postgrePool from './postgre';

import { isAuthenticated } from './utils/auth';

require('dotenv').config();

const app = express();

const start = async () => {
  const pgPool = await postgrePool();
  // await pgPool.sequelize.sync({ force: true });
  await pgPool.sequelize.sync();


  // let dataloaders = getDataloaders(pgPool);


  require('./config/configure-express')(app, pgPool);

  app.post(
    '/api',
    isAuthenticated,
    graphqlHTTP(request => {
      console.log('req.user:', request.user);
      const startTime = Date.now();

      let dataloaders = getDataloaders(pgPool);

      return {
        schema: schema,
        context: {
          user: request.user,
          pgPool: pgPool,
          dataloaders: dataloaders
        },

        /* eslint-disable-next-line no-unused-vars */
        extensions: ({ document, variables, operationName, result }) => ({
          timing: (Date.now() - startTime).toString() + 'ms',
        })
      };
    })
  );

  if (process.env.NODE_ENV !== 'production') {
    app.use(
      '/graphql',
      graphqlHTTP(request => {
        const startTime = Date.now();

        let dataloaders = getDataloaders(pgPool);

        return {
          schema: schema,
          context: {
            user: request.user,
            pgPool: pgPool,
            dataloaders: dataloaders
          },
          graphiql: true,

          /* eslint-disable-next-line no-unused-vars */
          extensions: ({ document, variables, operationName, result }) => ({
            timing: (Date.now() - startTime).toString() + 'ms',
          })
        };
      })
    );
  }

  app.listen(app.get('port'), () => {
    console.log(chalk.greenBright(`Server is now up @ ${app.get('host')}:${app.get('port')}`));
  });

};
start();
