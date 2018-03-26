import DataLoader from 'dataloader';
import { GraphQLError } from 'graphql';
import shortid from 'shortid';

export const Query = {
  ContactNumber: (_, { id }, { pgPool }) =>
    pgPool.ContactNumber.findOne({ where: { id: id }})
};

export const Mutation = {
  addContactNumber: async (_, { input }, { pgPool }) => {
    let vendor = await pgPool.Vendor.findOne({ where: { id: input.vendor_id }});

    if (!vendor) { throw new GraphQLError('Vendor does not exist'); }

    input.id = shortid.generate();
    return pgPool.ContactNumber.create(input);
  },

  deleteContactNumber: (_, { id }, { pgPool }) =>
    pgPool.ContactNumber.destroy({ where: { id: id }})
};

export const ContactNumber = {
  Vendor: (contactNumber, _, { dataloaders }) =>
    dataloaders.vendorById.load(contactNumber.vendor_id)
};

const getContactNumbersById = pgPool => ids =>
  Promise.resolve(
    ids.map(id => pgPool.ContactNumber.findOne({ where: { id: id }}))
  );

const getContactNumbersByVendorId = pgPool => ids =>
  Promise.resolve(
    ids.map(id => pgPool.ContactNumber.findAll({ where: { vendor_id: id }}))
  );

export const dataloaders = pgPool => ({
  contactNumberById: new DataLoader(getContactNumbersById(pgPool)),
  contactNumbersByVendorId: new DataLoader(getContactNumbersByVendorId(pgPool))
});
