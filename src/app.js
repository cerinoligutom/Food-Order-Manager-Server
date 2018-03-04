/* eslint-disable no-console */
const express = require('express');
const graphqlHTTP = require('express-graphql');
require('dotenv').config();

import { buildSchema } from 'graphql';
import chalk from 'chalk';

let schema = buildSchema(`
    type Query {
        hello: String
    }
`);

let root = { hello: () => 'Hello World!' };

const app = express();
require('./config/configure-express')(app);

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.listen(app.get('port'), () => {
  console.log(chalk.green(`Server is now up @ ${app.get('host')}:${app.get('port')}`));
});
