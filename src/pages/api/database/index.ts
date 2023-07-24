import { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2";

const config = {
  host: "my-aurora-cluster.cluster-c8icuvopqop3.us-east-1.rds.amazonaws.com",
  database: "AnLabDB",
  user: "AN_AuroraDB",
  password: "AnLabTest2023",
};

function checkStatus() {
  return new Promise((resolve, reject) => {
    const con = mysql.createConnection(config);
    con.connect((err) => {
      if (err) {
        reject(err);
      }
      resolve(con);
    });
  });
}

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  console.log("start checking db connection");
  try {
    await checkStatus();
    console.log("Connection has been established successfully.");
    return res
      .status(200)
      .json("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return res.status(200).json({
      status: false,
      config,
    });
  }
}
