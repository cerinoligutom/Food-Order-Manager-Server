import { dataloaders as userDataloaders } from './user/resolvers';
import { dataloaders as roleDataloaders } from './role/resolvers';
import { dataloaders as userRoleDataloaders } from './user-role/resolvers';
import { dataloaders as orderDataloaders } from './order/resolvers';
import { dataloaders as orderItemDataloaders } from './order-item/resolvers';
import { dataloaders as transactionDataloaders } from './transaction/resolvers';
import { dataloaders as productDataloaders } from './product/resolvers';
import { dataloaders as vendorDataloaders } from './vendor/resolvers';
import { dataloaders as contactNumberDataloaders } from './contact-number/resolvers';

export default (pool) => {
  return {
    ...userDataloaders(pool),
    ...roleDataloaders(pool),
    ...userRoleDataloaders(pool),
    ...orderDataloaders(pool),
    ...orderItemDataloaders(pool),
    ...transactionDataloaders(pool),
    ...productDataloaders(pool),
    ...vendorDataloaders(pool),
    ...contactNumberDataloaders(pool)
  };
};
