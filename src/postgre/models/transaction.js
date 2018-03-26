export default (sequelize, DataTypes) => {
  const Transaction = sequelize.define('transaction',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
      },

      host_id: { type: DataTypes.STRING },

      vendor_id: { type: DataTypes.STRING },

      description: { type: DataTypes.STRING },

      delivery_fee: { type: DataTypes.FLOAT },

      is_fulfilled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      underscored: true
    }
  );

  Transaction.associate = (models) => {
    Transaction.hasOne(models.Vendor);
    Transaction.belongsTo(models.User, { as: 'Host' });
  };

  return Transaction;
};
