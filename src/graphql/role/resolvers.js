import DataLoader from 'dataloader';

export const Query = {
  Role: async (_, { id }, { pgPool }) => {
    let role = await pgPool.Role.findOne({ where: { id: id } });
    return role;
  }
};

export const Mutation = {
  createRole: async (_, { name }, { pgPool }) => {
    // TODO:
    // Check if user is admin

    let createdRole = await pgPool.Role.create({name: name});
    return createdRole;
  }
};

export const getRolesById = pgPool => ids =>
  Promise.resolve(
    ids.map(id => pgPool.Role.findOne({ where: { id: id } }))
  );

export const dataloaders = pgPool => ({
  roleById: new DataLoader(getRolesById(pgPool))
});
