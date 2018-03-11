import {
  Query as UserQuery,
  Mutation as UserMutation,
  User
} from './user/resolvers';

import {
  Query as RoleQuery,
  Mutation as RoleMutation
} from './role/resolvers';

import {
  Query as UserRoleQuery,
  Mutation as UserRoleMutation
} from './user-role/resolvers';

import Date from './scalar/date';

export default {
  Query: {
    ...UserQuery,
    ...RoleQuery,
    ...UserRoleQuery
  },
  Mutation: {
    ...UserMutation,
    ...RoleMutation,
    ...UserRoleMutation
  },
  User,
  Date
};
