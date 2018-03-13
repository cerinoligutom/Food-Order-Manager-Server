import Base from '../base';
import User from '../user/schema';
import Vendor from '../vendor/schema';

const Transaction = `
extend type Query {
  Transaction(id: ID!): Transaction
}

extend type Mutation {
  addTransaction(input: AddTransactionInput): Transaction
  editTransaction(input: EditTransactionInput): Transaction
  deleteTransaction(id: ID!): Boolean
}

type Transaction {
  id: ID!
  Host: User
  Vendor: Vendor
  description: String
  delivery_fee: Float
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

export default () => [Base, User, Vendor, Transaction];
