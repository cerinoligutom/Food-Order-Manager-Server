import Base from '../base';
import User from '../user/schema';
import Transaction from '../transaction/schema';
import OrderItem from '../order-item/schema';

const Order = `
extend type Query {
  Order(id: ID!): Order
}

extend type Mutation {
  addOrder(input: AddOrderInput): Order
  editOrder(input: EditOrderInput): Order
  cancelOrder(id: ID!): Order
  changeOrderFullyPaidStatus(id: ID!, value: Boolean): Order
}

type Order {
  id: ID!
  User: User
  comment: String
  isFullyPaid: Boolean
  OrderItems: [OrderItem]
  Transaction: Transaction
  created_at: Date
}

input AddOrderInput {
  transaction_id: ID!
  user_id: ID!
  comment: String
  orderItems: [AddOrderItemInput]
}

input EditOrderInput {
  id: ID!
  comment: String
}
`;

export default () => [Base, User, Transaction, OrderItem, Order];
