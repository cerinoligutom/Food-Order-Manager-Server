import Sequelize from 'sequelize';
export default (sequelize, DataTypes) => {
  const Product = sequelize.define('product',
    {
      name: { type: DataTypes.STRING },

      image: { type: DataTypes.STRING },

      price: { type: Sequelize.FLOAT }
    },
    {
      underscored: true
    }
  );

  Product.associate = (models) => {
    Product.belongsTo(models.Vendor);
    Product.belongsToMany(models.OrderItem, {
      as: 'OrderItems',
      through: models.OrderItem,
      foreignKey: 'id',
      otherKey: 'product_id'
    });
  };

  return Product;
};
