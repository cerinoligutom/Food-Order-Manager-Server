const shortid = require('shortid');;

export default (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('order_item',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: shortid.generate()
      },

      order_id: { type: DataTypes.STRING },

      product_id: { type: DataTypes.STRING },

      quantity: { type: DataTypes.INTEGER },

      is_cancelled: {
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
