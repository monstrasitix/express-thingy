import { Db } from "mongodb";
import { getDatabase } from "@/database/client";

async function deleteCollections(db: Db) {
  for (const collection of await db.collections()) {
    collection.drop();
  }
}

async function setupDatabase() {
  const db = getDatabase();

  await deleteCollections(db);

  await db.collection("users").insertMany([
    { id: 1, firstName: "John", lastName: "Doe" },
    { id: 2, firstName: "Sally", lastName: "Murphy" },
    { id: 3, firstName: "Kevin", lastName: "Sullivan" },
    { id: 4, firstName: "Mike", lastName: "Reed" },
    { id: 5, firstName: "Dylan", lastName: "Clarke" },
  ]);

  await db.collection("animals").insertMany([
    { id: 1, type: "dog", name: "Doe" },
    { id: 2, type: "cat", name: "Murphy" },
    { id: 3, type: "dog", name: "Sullivan" },
    { id: 4, type: "dog", name: "Reed" },
    { id: 5, type: "elephant", name: "Clarke" },
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
