export default (sequelize, DataTypes) => {
  const Transaction = sequelize.define('transaction',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      host_id: { type: DataTypes.INTEGER },

      vendor_id: { type: DataTypes.INTEGER },

      description: { type: DataTypes.STRING },

      delivery_fee: { type: DataTypes.FLOAT }
    },
    {
      underscored: true
    }
  );

  Transaction.associate = (models) => {
    Transaction.hasOne(models.Vendor);
    Transaction.hasOne(models.User, { as: 'Host' });
  };

  return Transaction;
};
