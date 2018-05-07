import DataLoader from 'dataloader';
import { GraphQLError } from 'graphql';

export const Query = {
  getMembersWithRole: async (_, { id }, { pgPool }) => {
    let users = await pgPool.UserRole.findAll({
      where: {
        role_id: id
      }
    });

    return users;
  }
};

export const Mutation = {
  addUserRole: async (_, { userId, roleId }, { pgPool }) => {
    let user = await pgPool.User.findOne({ where: { id: userId } });
    if (!user) { throw new GraphQLError('User does not exist'); }

    let role = await pgPool.Role.findOne({ where: { id: roleId } });
    if (!role) { throw new GraphQLError('Role does not exist'); }

    let userRoleExists = await pgPool.UserRole.findOne({
      where: {
        user_id: userId,
        role_id: roleId
      }
    });
    if (userRoleExists) { throw new GraphQLError(`Username <${user.username}> already has role <${role.name}>`); }

    let isCreated = pgPool.UserRole.create({
      user_id: userId,
      role_id: roleId
    });

    return isCreated;
  },

  removeUserRole: async (_, { userId, roleId }, { pgPool }) => {
    let user = await pgPool.User.findOne({ where: { id: userId } });
    if (!user) { throw new GraphQLError('User does not exist'); }

    let role = await pgPool.Role.findOne({ where: { id: roleId } });
    if (!role) { throw new GraphQLError('Role does not exist'); }

    let isRemoved = await pgPool.UserRole.destroy({
      where: {
        user_id: userId,
        role_id: roleId
      }
    });

    return (isRemoved) ? true : false;
  }
};

export const getUserRolesById = pgPool => ids =>
  Promise.resolve(
    ids.map(id => pgPool.UserRole.findAll({ where: { user_id: id } }))
  );

export const dataloaders = pgPool => ({
  userRolesById: new DataLoader(getUserRolesById(pgPool))
});
