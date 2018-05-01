import DataLoader from 'dataloader';

export const Query = {
  Role: async (_, { id }, { pgPool }) => {
    let role = await pgPool.Role.findOne({ where: { id: id } });
    return role;
  },
  Roles: async (_, __, { pgPool }) => {
    let roles = await pgPool.Role.findAll();
    return roles;
  }
};

export const getRolesById = pgPool => ids =>
  Promise.resolve(
    ids.map(id => pgPool.Role.findOne({ where: { id: id } }))
  );

export const dataloaders = pgPool => ({
  roleById: new DataLoader(getRolesById(pgPool))
});
