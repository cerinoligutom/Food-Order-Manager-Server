import Base from '../base';
import User from '../user/schema';

const UserRole = `
extend type Query {
  getMembersWithRole(id: ID!): [User]
}

extend type Mutation {
  addUserRole(userId: ID!, roleId: ID!): Boolean
  removeUserRole(userId: ID!, roleId: ID!): Boolean
}
`;

export default() => [UserRole, User, Base];
