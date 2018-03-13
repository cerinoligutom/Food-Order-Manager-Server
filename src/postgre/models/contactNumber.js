export default (sequelize, DataTypes) => {
  const ContactNumber = sequelize.define('contact_number',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      number: { type: DataTypes.STRING },
      vendor_id: { type: DataTypes.INTEGER }
    },
    {
      underscored: true
    }
  );

  ContactNumber.associate = (models) => {
    ContactNumber.belongsTo(models.Vendor);
  };

  return ContactNumber;
};
