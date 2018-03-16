import Base from '../base';
import Role from '../role/schema';
import Order from '../order/schema';

const User = `
extend type Query {
  me: User
  User(id: ID!): User
}

extend type Mutation {
  createUser(input: CreateUserInput): User
  editUser(input: EditUserInput): User
}

type User {
  id: ID!
  username: String
  hash: String
  first_name: String
  middle_name: String
  last_name: String
  full_name: String
  birthdate: Date
  nickname: String
  email: String
  caption: String
  image: String
  confirmed: Boolean
  created_at: Date
  is_active: Boolean
  Role: [Role]
  Order: [Order]
}

input CreateUserInput {
  username: String!
  hash: String!
  first_name: String
  middle_name: String
  last_name: String
  email: String!
}

input EditUserInput {
  id: ID!
  hash: String
  first_name: String
  middle_name: String
  last_name: String
  birthdate: Date
  nickname: String
  email: String
  caption: String
  image: String
}
`;

export default () => [User, Role, Order, Base];
