import shortid from 'shortid';

export default (sequelize, DataTypes) => {
  const Vendor = sequelize.define('vendor',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: shortid.generate()
      },

      name: { type: DataTypes.STRING },

      image: { type: DataTypes.STRING },

      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
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
