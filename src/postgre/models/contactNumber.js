export default (sequelize, DataTypes) => {
  const ContactNumber = sequelize.define('contact_number',
    {
      number: { type: DataTypes.STRING },
      vendor_id: { type: DataTypes.INTEGER }
    },
    {
      underscored: true
    }
  );

  ContactNumber.associate = (models) => {
    ContactNumber.belongsTo(models.Vendor, {
      foreignKey: 'vendor_id'
    });
  };

  return ContactNumber;
};
