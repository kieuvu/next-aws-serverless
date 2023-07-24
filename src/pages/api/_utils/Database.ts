import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "mysql",
  database: "AnLabDB",
  host: "my-aurora-cluster.cluster-c8icuvopqop3.us-east-1.rds.amazonaws.com",
  username: "AN_AuroraDB",
  password: "AnLabTest2023",
  dialectModule: require("mysql2"),
  port: 3306,
  sync: {
    force: true,
  },
});
