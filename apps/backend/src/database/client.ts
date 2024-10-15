import { MongoClient, Db } from "mongodb";

export const client = new MongoClient(process.env.CONN_STRING);

export function getDatabase(): Db {
  return client.db("app-db");
}
