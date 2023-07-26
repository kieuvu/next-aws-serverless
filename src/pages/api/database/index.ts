import { NextApiRequest, NextApiResponse } from "next";
import mysql, { Connection, QueryError } from "mysql2";
import Env from "../_utils/Env";

const config = {
  host: Env.get<string>("DB_URL"),
  database: Env.get<string>("DB_NAME"),
  user: Env.get<string>("DB_USERNAME"),
  password: Env.get<string>("DB_PASSWORD"),
};

function checkStatus(): Promise<any> {
  return new Promise(
    (resolve: (value: any) => void, reject: (reason: any) => void): void => {
      const con: Connection = mysql.createConnection(config);
      con.connect((err: QueryError | null): void => {
        if (err) {
          reject(err);
        }
        resolve(con);
      });
    },
  );
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
      message: "Unable to connect to the database",
    });
  }
}
