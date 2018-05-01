import Base from '../base';

const Role = `
extend type Query {
  Role(id: ID): Role
  Roles: [Role]
}

type Role {
  id: ID,
  name: String
}
`;

export default() => [Role, Base];
