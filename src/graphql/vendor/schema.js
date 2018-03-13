import Base from '../base';
import ContactNumber from '../contact-number/schema';
import Product from '../product/schema';

const Vendor = `
extend type Query {
  Vendor(id: ID!): Vendor
}

extend type Mutation {
  addVendor(input: AddVendorInput): Vendor
  editVendor(input: EditVendorInput): Vendor
}

type Vendor {
  id: ID!
  name: String
  image: String
  ContactNumbers: [ContactNumber],
  Products: [Product]
}

input AddVendorInput {
  name: String!
  image: String
}

input EditVendorInput {
  id: ID!
  name: String
  image: String
  isActive: Boolean
}
`;

export default () => [Base, ContactNumber, Product, Vendor];
