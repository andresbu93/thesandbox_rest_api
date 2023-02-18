import { Sequelize } from 'sequelize';

export let sequelize: Sequelize;

async function connect(): Promise<Sequelize> {
  sequelize = new Sequelize(
    process.env.DB_NAME || 'thesandbox',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || 'root',
    {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'mysql',
    }
  );
  return sequelize;
}

async function tryConnection() {
  try {
    sequelize = await connect();
    await sequelize.authenticate();
    console.info('connected to database');
    await sequelize.sync({ alter: false });
    console.info('syncronized database');
    return sequelize;
  } catch (error) {
    console.error('CONNECTION ERROR');
    console.error(error);
    setTimeout(tryConnection, 10000);
  }
}

tryConnection();
