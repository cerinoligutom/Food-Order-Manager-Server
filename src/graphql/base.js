const Base = `
  type Query {
    dummy: Boolean
  }

  type Mutation {
    dummy: Boolean
  }

  scalar Date
`;

export default () => [Base];
