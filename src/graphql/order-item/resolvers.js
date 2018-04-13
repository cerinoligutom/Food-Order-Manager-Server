import { GraphQLError } from 'graphql';
import DataLoader from 'dataloader';
import shortid from 'shortid';

export const Query = {
  OrderItem: async (_, { id }, { pgPool }) =>
    pgPool.OrderItem.findOne({ where: { id: id }})
};

export const Mutation = {
  addOrderItems: async (_, { input }, { pgPool }) => {
    if (input.length === 0) { throw new GraphQLError('No input'); }

    let order = await pgPool.Order.findOne({ where: { id: input[0].order_id }});

    if (!order) { throw new GraphQLError('Order does not exist'); }

    input = input.map(orderItem => {
      let temp = {...orderItem};
      temp.id = shortid.generate();
      return temp;
    });

    let orderItems = await pgPool.OrderItem.bulkCreate(input);

    if (!orderItems) { throw new GraphQLError('No Order Items created', orderItems); }

    return orderItems;
  },

  editOrderItem: async (_, { input }, { pgPool }) => {
    let orderItem = await pgPool.OrderItem.findOne({ where: { id: input.id }});

    if (!orderItem) { throw new GraphQLError(`Order Item ID <${input.id} does not exist`); }

    return orderItem.updateAttributes(input);
  },

  cancelOrderItem: async (_, { id }, { pgPool }) => {
    let orderItem = await pgPool.OrderItem.findOne({ where: { id: id }});

    if (!orderItem) { throw new GraphQLError(`Order Item ID <${id} does not exist`); }

    return orderItem.updateAttributes({ isCancelled: true });
  }
};

export const OrderItem = {
  Order: (orderItem, _, { dataloaders }) =>
    dataloaders.orderById.load(orderItem.order_id),

  Product: (orderItem, _, { dataloaders }) =>
    dataloaders.productById.load(orderItem.product_id)
};

const getOrderItemsByOrderIds = pgPool => ids =>
  Promise.resolve(
    ids.map(id => pgPool.OrderItem.findAll({ where: { order_id: id }}))
  );

export const dataloaders = pgPool => ({
  orderItemsByOrderId: new DataLoader(getOrderItemsByOrderIds(pgPool))
});
