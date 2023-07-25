import { Sequelize } from "sequelize";
import Env from "./Env";

const config = {
  host: Env.get<string>("DB_URL"),
  database: Env.get<string>("DB_NAME"),
  user: Env.get<string>("DB_USERNAME"),
  password: Env.get<string>("DB_PASSWORD"),
};

export const sequelize = new Sequelize({
  dialect: "mysql",
  host: config.host,
  database: config.database,
  username: config.user,
  password: config.password,
  dialectModule: require("mysql2"),
  port: 3306,
  sync: {
    force: true,
  },
});
