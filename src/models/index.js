import Sequelize from 'sequelize';
import chalk from 'chalk';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export default async () => {
  let maxReconnects = 3;
  let connected = false;

  let database = process.env.DB_NAME || 'FOM';
  let username = process.env.DB_USER || 'postgres';
  let password = process.env.DB_PASS || 'password';

  const sequelize = new Sequelize(
    database,
    username,
    password,
    {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'postgres',
      operatorsAliases: Sequelize.Op,
      define: {
        underscored: true,
      },
    });

  while (!connected && maxReconnects) {
    try {
      await sequelize.authenticate();
      connected = true;
    } catch (err) {
      /* eslint-disable-next-line no-console */
      console.log(chalk.yellow('reconnecting in 5 seconds'));
      await sleep(5000);
      maxReconnects -= 1;
    }
  }

  if (!connected) {
    return null;
  }

  const models = {
    User: sequelize.import('./user'),
    Role: sequelize.import('./role'),
    UserRole: sequelize.import('./userRole'),
    Order: sequelize.import('./order'),
    OrderItem: sequelize.import('./orderItem'),
    Vendor: sequelize.import('./vendor'),
    Product: sequelize.import('./product'),
    ContactNumber: sequelize.import('./contactNumber'),
    Transaction: sequelize.import('./transaction')
  };

  Object.keys(models).forEach((modelName) => {
    if ('associate' in models[modelName]) {
      models[modelName].associate(models);
    }
  });

  models.sequelize = sequelize;
  models.Sequelize = Sequelize;
  models.op = Sequelize.Op;

  return models;
};
