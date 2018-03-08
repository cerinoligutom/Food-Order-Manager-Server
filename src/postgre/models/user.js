export default (sequelize, DataTypes) => {
  const User = sequelize.define('user',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      username: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isAlphanumeric: {
            args: true,
            msg: 'The username can only contain letters and numbers'
          },
        }
      },

      hash: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [5, 100],
            msg: 'The password needs to be between 5 and 100 characters long'
          }
        }
      },

      first_name: { type: DataTypes.STRING },

      middle_name: { type: DataTypes.STRING },

      last_name: { type: DataTypes.STRING },

      birthdate: { type: DataTypes.DATE },

      nickname: { type: DataTypes.STRING },

      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: 'Invalid email'
          },
          isMllrDevEmail(value) {
            const validDomains = ['mllrdev.com'];

            let isValid = false;
            validDomains.forEach(domain => {
              if (!isValid) {
                if (value.endsWith(domain)) {
                  isValid = true;
                }
              }
            });

            if (!isValid) {
              throw new Error('This email domain is not allowed.');
            }
          }
        }
      },

      caption: { type: DataTypes.STRING },

      image: { type: DataTypes.STRING },

      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {
      underscored: true
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Order);
    User.hasMany(models.Role);
  };

  return User;
};
