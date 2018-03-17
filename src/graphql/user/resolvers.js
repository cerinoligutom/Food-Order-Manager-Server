import DataLoader from 'dataloader';
import { GraphQLError } from 'graphql';
import { generateHash } from '../../utils/password';

export const Query = {
  User: async (_, { id }, { pgPool }) => {
    let user = await pgPool.User.findOne({ where: { id: id } });
    return user;
  }
};

export const Mutation = {
  // createUser: async (_, { input }, { pgPool }) => {
  //   let user = await pgPool.User.findOne({
  //     where: {
  //       [pgPool.op.or]: [{ username: input.username }, { email: input.email }]
  //     }
  //   });

  //   if (user) { throw new GraphQLError('Username / Email already exists'); }

  //   let hash = await generateHash(input.hash);
  //   input.hash = hash;

  //   let createdUser = await pgPool.User.create(input);
  //   return createdUser;
  // },

  editUser: async (_, { input }, { pgPool }) => {
    // TODO:
    // Check on context if user is editing itself
    // if (!input.id === user.id) {
    //   // Probably return 403 here
    //   throw new GraphQLError('Forbidden');
    // }

    let user = await pgPool.User.findOne({ where: { id: input.id } });

    if (!user) { throw new GraphQLError(`User ID #${input.id} does not exist`); }

    await user.updateAttributes(input);
    return user;
  },
};

export const User = {
  full_name: user => Promise.resolve(`${user.first_name} ${user.last_name}`),

  Role: async (user, _, { dataloaders }) => {
    let userRoles = await dataloaders.userRolesById.load(user.id);
    return userRoles.map(userRole => dataloaders.roleById.load(userRole.role_id));
  },

  Order: (user, _, { dataloaders }) =>
    dataloaders.ordersByUserId.load(user.id)
};

const getUsersById = pgPool => ids =>
  Promise.resolve(
    ids.map(id => pgPool.User.findOne({ where: { id: id } }))
    // Might want to consider filtering the results if the requested ID is not found
  );

export const dataloaders = pgPool => ({
  userById: new DataLoader(getUsersById(pgPool))
});
