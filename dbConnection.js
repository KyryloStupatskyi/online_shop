const { Sequelize } = require("sequelize");
const { infoLog, errorLog } = require("./utils/extra/logs");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: (msg) => {
      if (msg.includes("Executing (default): SELECT 1+1 AS result")) {
        infoLog("Database connection established successfully.");
      } else {
        console.log(msg);
      }
    },
  }
);

const testDatabaseConnection = async () => {
  while (true) {
    try {
      await sequelize.authenticate();
      await sequelize.sync();
      break;
    } catch (err) {
      errorLog(
        `Failed to connect to database. Retrying database connection in 5s... \n\tError log: ${err.message}. `
      );
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
};

module.exports = {
  testDatabaseConnection,
  sequelize,
};
