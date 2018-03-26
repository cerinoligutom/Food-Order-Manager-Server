const shortid = require('shortid');;

export default (sequelize, DataTypes) => {
  const ContactNumber = sequelize.define('contact_number',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: shortid.generate()
      },

      number: { type: DataTypes.STRING },

      vendor_id: { type: DataTypes.STRING }
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
