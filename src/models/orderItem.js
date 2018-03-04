export default (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('order_item',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      order_id: { type: DataTypes.INTEGER },
      product_id: { type: DataTypes.INTEGER }
    },
    {
      underscored: true
    }
  );

  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Order, {
      foreignKey: 'order_id'
    });
    OrderItem.belongsTo(models.Product, {
      foreignKey: 'product_id'
    });
  };

  return OrderItem;
};
