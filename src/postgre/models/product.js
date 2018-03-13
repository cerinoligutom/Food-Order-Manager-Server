import Sequelize from 'sequelize';
export default (sequelize, DataTypes) => {
  const Product = sequelize.define('product',
    {
      name: { type: DataTypes.STRING },

      image: { type: DataTypes.STRING },

      price: { type: Sequelize.FLOAT },

      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {
      underscored: true
    }
  );

  Product.associate = (models) => {
    Product.belongsTo(models.Vendor);
  };

  return Product;
};
