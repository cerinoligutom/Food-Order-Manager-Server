export default (sequelize, DataTypes) => {
  const Order = sequelize.define('order',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      user_id: { type: DataTypes.INTEGER },

      comments: { type: DataTypes.STRING },

      quantity: { type: DataTypes.INTEGER },

      is_fully_paid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      underscored: true
    }
  );

  Order.associate = (models) => {
    Order.belongsToMany(models.OrderItem, {
      as: 'OrderItems',
      through: models.OrderItem,
      foreignKey: 'id',
      otherKey: 'order_id'
    });
  };

  return Order;
};
