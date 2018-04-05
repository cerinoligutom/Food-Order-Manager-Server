import Base from '../base';
import Product from '../product/schema';
import Order from '../order/schema';

const OrderItem = `
extend type Query {
  OrderItem(id: ID!): OrderItem
}

extend type Mutation {
  addOrderItems(input: [AddOrderItemInput]): [OrderItem]
  editOrderItem(input: EditOrderItemInput): OrderItem
  cancelOrderItem(id: ID!): OrderItem
}

type OrderItem {
  id: ID!
  Order: Order
  Product: Product
  quantity: Int
  is_cancelled: Boolean
  created_at: Date
}

input AddInitialOrderItemInput {
  product_id: ID!
  quantity: Int!
}

input AddOrderItemInput {
  order_id: ID!
  product_id: ID!
  quantity: Int!
}

input EditOrderItemInput {
  id: ID!
  quantity: Int!
}
`;

export default() => [Base, Product, Order, OrderItem];
