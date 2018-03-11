import { dataloaders as userDataloaders } from './user/resolvers';
import { dataloaders as roleDataloaders } from './role/resolvers';
import { dataloaders as userRoleDataloaders } from './user-role/resolvers';

export default (pool) => {
  return {
    ...userDataloaders(pool),
    ...roleDataloaders(pool),
    ...userRoleDataloaders(pool)
  };
};
