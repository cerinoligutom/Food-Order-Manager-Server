export default (sequelize, DataTypes) => {
  const Role = sequelize.define('role',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
      },

      name: { type: DataTypes.STRING }
    },
    {
      underscored: true
    }
  );

  return Role;
};
