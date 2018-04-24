import { GraphQLError } from 'graphql';
import DataLoader from 'dataloader';
import shortid from 'shortid';

export const Query = {
  Order: (_, { id }, { pgPool }) =>
    pgPool.Order.findOne({ where: { id: id, isCancelled: false }})
};

export const Mutation = {
  addOrder: async (_, { input }, { pgPool }) => {
    let transaction = await pgPool.Transaction.findOne({ where: { id: input.transaction_id }});

    if (!transaction) { throw new GraphQLError(`Transaction ID <${input.transaction_id}> does not exist`); }

    let order = await pgPool.Order.create({
      id: shortid.generate(),
      transaction_id: input.transaction_id,
      user_id: input.user_id,
      comment: input.comment
    });

    if (!order) { throw new GraphQLError('Order not created', order); }

    input.orderItems = input.orderItems.map(orderItem => {
      let temp = {...orderItem};
      temp.id = shortid.generate();
      temp.order_id = order.id;
      return temp;
    });

    let orderItems = await pgPool.OrderItem.bulkCreate(input.orderItems);

    if (!orderItems) { throw new GraphQLError('No Order Items created', orderItems); }

    return order;
  },

  cancelOrder: async (_, { id }, { pgPool }) => {
    let order = await pgPool.Order.findOne({ where: { id: id }});

    if (!order) { throw new GraphQLError(`Order ID <${id}> does not exist`); }

    return order.updateAttributes({ isCancelled: true });
  },

  changeOrderFullyPaidStatus: async (_, { id, value }, { pgPool }) => {
    let order = await pgPool.Order.findOne({ where: { id: id }});

    if (!order) { throw new GraphQLError(`Order ID <${id}> does not exist`); }

    return order.updateAttributes({ isFullyPaid: value });
  }
};

export const Order = {
  User: (order, _, { dataloaders }) =>
    dataloaders.userById.load(order.user_id),

  OrderItems: (order, _, { dataloaders }) =>
    dataloaders.orderItemsByOrderId.load(order.id),

  Transaction: (order, _, { dataloaders }) =>
    dataloaders.transactionById.load(order.transaction_id)
};

const getOrdersById = pgPool => ids =>
  Promise.resolve(
    ids.map(id => pgPool.Order.findOne({ where: { id: id, isCancelled: false }}))
  );

const getOrdersByUserIds = pgPool => ids =>
  Promise.resolve(
    ids.map(id => pgPool.Order.findAll({ where: { user_id: id, isCancelled: false }}))
  );

const getOrdersByTransactionIds = pgPool => ids =>
  Promise.resolve(
    ids.map(id => pgPool.Order.findAll({ where: { transaction_id: id, isCancelled: false }}))
  );

export const dataloaders = pgPool => ({
  orderById: new DataLoader(getOrdersById(pgPool)),
  ordersByUserId: new DataLoader(getOrdersByUserIds(pgPool)),
  ordersByTransactionId: new DataLoader(getOrdersByTransactionIds(pgPool))
});
