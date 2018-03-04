/* eslint-disable no-console */
let express = require('express');
let graphqlHTTP = require('express-graphql');
let compression = require('compression');
import { buildSchema } from 'graphql';
import chalk from 'chalk';

let schema = buildSchema(`
    type Query {
        hello: String
    }
`);

let root = { hello: () => 'Hello World!' };

let app = express();
app.use(compression());

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.listen(3000, () => {
  console.log(chalk.green('Server is up on localhost:3000/graphql'));
});
