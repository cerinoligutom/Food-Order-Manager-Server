import shortid from 'shortid';

export default (sequelize, DataTypes) => {
  const Role = sequelize.define('role',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: shortid.generate()
      },

      name: { type: DataTypes.STRING }
    },
    {
      underscored: true
    }
  );

  return Role;
};
