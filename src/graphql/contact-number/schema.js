import Base from '../base';
import Vendor from '../vendor/schema';

const ContactNumber = `
extend type Query {
  ContactNumber(id: ID!): ContactNumber
}

extend type Mutation {
  addContactNumber(input: AddContactNumberInput): ContactNumber
  deleteContactNumber(id: ID!): Boolean
}

type ContactNumber {
  Vendor: Vendor
  number: String
}

input AddContactNumberInput {
  vendor_id: ID!
  number: String!
}
`;

export default () => [Base, Vendor, ContactNumber];
