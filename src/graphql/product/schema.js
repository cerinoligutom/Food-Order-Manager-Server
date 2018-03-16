import Base from '../base';
import Vendor from '../vendor/schema';

const Product = `
extend type Query {
  Product(id: ID!): Product
}

extend type Mutation {
  addProduct(input: AddProductInput): Product
  editProduct(input: EditProductInput): Product
  deleteProduct(id: ID!): Boolean
}

type Product {
  id: ID!
  Vendor: Vendor
  name: String
  price: Float
  image: String
  is_active: Boolean
}

input AddProductInput {
  vendor_id: ID!
  name: String
  price: Float
  image: String
}

input EditProductInput {
  id: ID!
  name: String
  price: Float
  image: String
  is_active: Boolean
}
`;

export default () => [Base, Vendor, Product];
