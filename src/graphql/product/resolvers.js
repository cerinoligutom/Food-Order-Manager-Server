import { GraphQLError } from 'graphql';
import DataLoader from 'dataloader';
import shortid from 'shortid';

export const Query = {
  Product: (_, { id }, { pgPool }) =>
    pgPool.Product.findOne({ where: { id: id } })
};

export const Mutation = {
  addProduct: async (_, { input }, { pgPool }) => {
    let vendor = await pgPool.Vendor.findOne({ where: { id: input.vendor_id }});

    if (!vendor) { throw new GraphQLError(`Vendor ID <${input.vendor_id}> does not exist`); }

    input.id = shortid.generate();
    return pgPool.Product.create(input);
  },

  editProduct: async (_, { input }, { pgPool }) => {
    let product = await pgPool.Product.findOne({ where: { id: input.id }});

    if (!product) { throw new GraphQLError(`Product ID <${input.id}> does not exist`); }

    return product.updateAttributes(input);
  },

  deleteProduct: async (_, { id }, { pgPool }) =>
    pgPool.Product.destroy({ where: { id: id }})
};

export const Product = {
  Vendor: (product, _, { dataloaders }) =>
    dataloaders.vendorById.load(product.vendor_id)
};

const getProductsById = pgPool => ids =>
  Promise.resolve(
    ids.map(id => pgPool.Product.findOne({ where: { id: id }}))
  );

const getProductsByVendorId = pgPool => ids =>
  Promise.resolve(
    ids.map(id => pgPool.Product.findAll({ where: { vendor_id: id }}))
  );

export const dataloaders = pgPool => ({
  productById: new DataLoader(getProductsById(pgPool)),
  productsByVendorId: new DataLoader(getProductsByVendorId(pgPool))
});
