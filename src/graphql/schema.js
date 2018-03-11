import { makeExecutableSchema } from 'graphql-tools';
import Base from './base';

import User from './user/schema';
import Role from './role/schema';
import UserRole from './user-role/schema';


import resolvers from './resolvers';

export default makeExecutableSchema({
  typeDefs: [Base, Role, User,  UserRole],
  resolvers,
  logger: { log: e => console.log(e) }  // eslint-disable-line no-console
});
