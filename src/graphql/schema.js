import { makeExecutableSchema } from 'graphql-tools';
import Base from './base';

import User from './user/schema';
import Role from './role/schema';
import UserRole from './user-role/schema';
import Order from './order/schema';
import OrderItem from './order-item/schema';
import Product from './product/schema';
import Vendor from './vendor/schema';
import ContactNumber from './contact-number/schema';
import Transaction from './transaction/schema';

import resolvers from './resolvers';

export default makeExecutableSchema({
  typeDefs: [
    Base,
    Role,
    User,
    UserRole,
    Order,
    OrderItem,
    Product,
    Vendor,
    ContactNumber,
    Transaction
  ],
  resolvers,
  logger: { log: e => console.log(e) }  // eslint-disable-line no-console
});
