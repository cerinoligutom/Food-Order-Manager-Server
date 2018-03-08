import {
  Query as UserQuery,
  Mutation as UserMutation,
  User
} from './user/resolvers';
import Date from './scalar/date';

export default {
  Query: {
    ...UserQuery
  },
  Mutation: {
    ...UserMutation
  },
  User,
  Date
};
