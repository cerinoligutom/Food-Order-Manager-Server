const shortid = require('shortid');;

export default (sequelize, DataTypes) => {
  const Order = sequelize.define('order',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: shortid.generate()
      },

      user_id: { type: DataTypes.STRING },

      comment: { type: DataTypes.STRING },

      isFullyPaid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },

      transaction_id: { type: DataTypes.STRING },

      isCancelled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      underscored: true
    }
  );

  Order.associate = (models) => {
    // Order.belongsToMany(models.OrderItem, {
    //   as: 'OrderItems',
    //   through: models.OrderItem,
    //   foreignKey: 'id',
    //   otherKey: 'order_id'
    // });
    Order.hasMany(models.OrderItem);

    Order.belongsTo(models.Transaction);
  };

  return Order;
};
