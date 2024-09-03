import { Db } from "mongodb";
import { getDatabase } from "@/database/client";
import { getCollection } from "@/database/collection";

async function deleteCollections(db: Db) {
  for (const collection of await db.collections()) {
    collection.drop();
  }
}

async function setupDatabase() {
  const db = getDatabase();

  await deleteCollections(db);

  await getCollection(db, "users").insertMany([
    { firstName: "John", lastName: "Doe" },
    { firstName: "Sally", lastName: "Murphy" },
    { firstName: "Kevin", lastName: "Sullivan" },
    { firstName: "Mike", lastName: "Reed" },
    { firstName: "Dylan", lastName: "Clarke" },
  ]);

  await getCollection(db, "animals").insertMany([
    { type: "dog", name: "Doe" },
    { type: "cat", name: "Murphy" },
    { type: "dog", name: "Sullivan" },
    { type: "dog", name: "Reed" },
    { type: "elephant", name: "Clarke" },
  ]);
}

setupDatabase()
  .then(() => {
    console.log("Setup done");
  })
  .catch(() => {
    console.log("Error happened");
  })
  .finally(() => {
    process.exit(1);
  });
