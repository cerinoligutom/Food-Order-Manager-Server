export default (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('order_item',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      order_id: { type: DataTypes.INTEGER },
      product_id: { type: DataTypes.INTEGER },
      quantity: { type: DataTypes.INTEGER },
      isCancelled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      underscored: true
    }
  );

  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Order);
    OrderItem.belongsTo(models.Product);
  };

  return OrderItem;
};
