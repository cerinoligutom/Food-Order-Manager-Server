export default (sequelize, DataTypes) => {
  const Vendor = sequelize.define('vendor',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      name: { type: DataTypes.STRING },

      image: { type: DataTypes.STRING }
    },
    {
      underscored: true
    }
  );

  Vendor.associate = (models) => {
    Vendor.hasMany(models.ContactNumber);
  };

  return Vendor;
};
