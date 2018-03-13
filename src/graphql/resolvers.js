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

import {
  Query as OrderQuery,
  Mutation as OrderMutation,
  Order
} from './order/resolvers';

import {
  Query as OrderItemQuery,
  Mutation as OrderItemMutation,
  OrderItem
} from './order-item/resolvers';

import {
  Query as ProductQuery,
  Mutation as ProductMutation,
  Product
} from './product/resolvers';

import {
  Query as VendorQuery,
  Mutation as VendorMutation,
  Vendor
} from './vendor/resolvers';

import {
  Query as ContactNumberQuery,
  Mutation as ContactNumberMutation
} from './contact-number/resolvers';

import {
  Query as TransactionQuery,
  Mutation as TransactionMutation,
  Transaction
} from './transaction/resolvers';

import Date from './scalar/date';

export default {
  Query: {
    ...UserQuery,
    ...RoleQuery,
    ...UserRoleQuery,
    ...OrderQuery,
    ...OrderItemQuery,
    ...ProductQuery,
    ...VendorQuery,
    ...ContactNumberQuery,
    ...TransactionQuery
  },
  Mutation: {
    ...UserMutation,
    ...RoleMutation,
    ...UserRoleMutation,
    ...OrderMutation,
    ...OrderItemMutation,
    ...ProductMutation,
    ...VendorMutation,
    ...ContactNumberMutation,
    ...TransactionMutation
  },
  User,
  Date,
  Order,
  OrderItem,
  Transaction,
  Product,
  Vendor
};
