import { GraphQLError } from 'graphql';
import DataLoader from 'dataloader';

export const Query = {
  Vendor: (_, { id }, { pgPool }) =>
    pgPool.Vendor.findOne({ where: { id: id }}),

  // TODO: Pagination
  // eslint-disable-next-line no-unused-vars
  Vendors: (_, { from, limit }, { pgPool }) =>
    pgPool.Vendor.findAll()
};

export const Mutation = {
  addVendor: (_, { input }, { pgPool }) => {
    // TODO:
    // Check if vendor exists
    return pgPool.Vendor.create(input);
  },

  editVendor: async (_, { input }, { pgPool }) => {
    let vendor = await pgPool.Vendor.findOne({ where: { id: input.id }});

    if (!vendor) { throw new GraphQLError(`Vendor ID <${input.id} does not exist`); }

    return vendor.updateAttributes(input);
  }
};

export const Vendor = {
  ContactNumbers: (vendor, _, { dataloaders }) =>
    dataloaders.contactNumbersByVendorId.load(vendor.id),

  Products: (vendor, _, { dataloaders }) =>
    dataloaders.productsByVendorId.load(vendor.id)
};

const getVendorsById = pgPool => ids =>
  Promise.resolve(
    ids.map(id => pgPool.Vendor.findOne({ where: { id: id }}))
  );

export const dataloaders = pgPool => ({
  vendorById: new DataLoader(getVendorsById(pgPool))
});
