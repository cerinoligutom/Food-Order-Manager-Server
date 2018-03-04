/* eslint-disable no-console */
const express = require('express');
const graphqlHTTP = require('express-graphql');
import { buildSchema } from 'graphql';
import chalk from 'chalk';
import getModels from './models';
require('dotenv').config();

let schema = buildSchema(`
    type Query {
        hello: String
    }
`);

let root = { hello: () => 'Hello World!' };

const app = express();
require('./config/configure-express')(app);

getModels().then((models) => {
  if (!models) {
    /* eslint-disable-next-line no-console */
    console.log(chalk.redBright('Could not connect to database'));
    return;
  }

  models.sequelize.sync({ force: true }).then(() => {
    app.use('/graphql', graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: true
    }));

    app.listen(app.get('port'), () => {
      console.log(chalk.greenBright(`Server is now up @ ${app.get('host')}:${app.get('port')}`));
    });
  });
}, err => console.log(err));
