import { GraphQLError } from 'graphql';
import DataLoader from 'dataloader';

export const Query = {
  Transaction: (_, { id }, { pgPool }) =>
    pgPool.Transaction.findOne({ where: { id: id }})
};

export const Mutation = {
  addTransaction: async (_, { input }, { pgPool }) => {
    let host = await pgPool.User.findOne({ where: { id: input.host_id }});

    if (!host) { throw new GraphQLError(`User ID <${input.host_id}> does not exist`); }

    let vendor = await pgPool.Vendor.findOne({ where: { id: input.vendor_id }});

    if (!vendor) { throw new GraphQLError(`Vendor ID <${input.vendor_id}> does not exist`); }

    return pgPool.Transaction.create(input);
  },

  editTransaction: async (_, { input }, { pgPool }) => {
    let transaction = await pgPool.Transaction.findOne({ where: { id: input.id }});

    if (!transaction) { throw new GraphQLError(`Transaction ID <${input.id}> does not exist`); }

    return transaction.updateAttributes(input);
  },

  deleteTransaction: (_, { id }, { pgPool }) =>
    pgPool.Transaction.destroy({ where: { id: id }})
};

export const Transaction = {
  Host: (transaction, _, { dataloaders }) =>
    dataloaders.userById.load(transaction.host_id),

  Vendor: (transaction, _, { dataloaders }) =>
    dataloaders.vendorById.load(transaction.vendor_id)
};

const getTransactionsById = pgPool => ids =>
  Promise.resolve(
    ids.map(id => pgPool.Transaction.findOne({ where: { id: id }}))
  );

export const dataloaders = pgPool => ({
  transactionById: new DataLoader(getTransactionsById(pgPool))
});
