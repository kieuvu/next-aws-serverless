import { Sequelize } from "sequelize";
import Env from "./Env";

const config = {
  host: Env.get<string>("DB_URL"),
  database: Env.get<string>("DB_Name"),
  user: Env.get<string>("DB_UserName"),
  password: Env.get<string>("DB_Password"),
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
