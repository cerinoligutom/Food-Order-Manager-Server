import Base from '../base';

const Role = `
extend type Query {
  Role(id: ID): Role
  Roles: [Role]
}

extend type Mutation {
  createRole(name: String!): Role
  deleteRole(id: ID!): Boolean
}

type Role {
  id: ID,
  name: String
}
`;

export default() => [Role, Base];
