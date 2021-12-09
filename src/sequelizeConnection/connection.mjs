import Sequelize from 'sequelize';
import dotenv from "dotenv/config";

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;
const HOST = process.env.DB_HOST;
const dialect = process.env.DB_DIALECT;

const sequelize = new Sequelize({
  username: username,
  password: password,
  database: database,
  host: HOST,
  dialect: dialect,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("it connect");
  })
  .catch((err) => {
    console.log("err", err);
  });

export default sequelize;