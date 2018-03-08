import Base from '../base';

const User = `
extend type Query {
  me: User
  User(id: ID!): User
}

extend type Mutation {
  createUser(input: CreateUserInput): User
  editUser(input: EditUserInput): User
  deleteUser(id: ID!): Boolean
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
  active: Boolean
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

export default() => [User, Base];
