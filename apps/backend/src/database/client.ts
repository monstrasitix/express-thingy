import { MongoClient, Db } from "mongodb";

const client = new MongoClient(process.env.CONN_STRING);

export function getDatabase(): Db {
  return client.db("app-db");
}
