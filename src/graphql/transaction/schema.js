import Base from '../base';
import User from '../user/schema';
import Vendor from '../vendor/schema';
import Order from '../order/schema';

const Transaction = `
extend type Query {
  Transaction(id: ID!): Transaction

  # Pagination not implemented yet
  Transactions(from: ID = "", limit: Int = 10): [Transaction]
}

extend type Mutation {
  addTransaction(input: AddTransactionInput): Transaction
  editTransaction(input: EditTransactionInput): Transaction
  deleteTransaction(id: ID!): Boolean
  changeTransactionFulfilledStatus(id: ID!, value: Boolean): Transaction
}

type Transaction {
  id: ID!
  Host: User
  Vendor: Vendor
  Orders: [Order]
  description: String
  delivery_fee: Float
  created_at: Date
  is_fulfilled: Boolean
}

input AddTransactionInput {
  host_id: ID!
  vendor_id: ID!
  description: String
  delivery_fee: Float
}

input EditTransactionInput {
  id: ID!
  description: String
  delivery_fee: Float
}
`;

export default () => [Base, User, Vendor, Order, Transaction];
