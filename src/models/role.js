export default (sequelize, DataTypes) => {
  const Role = sequelize.define('role',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      name: { type: DataTypes.STRING }
    },
    {
      underscored: true
    }
  );

  return Role;
};
