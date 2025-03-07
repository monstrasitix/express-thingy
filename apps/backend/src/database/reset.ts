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

  await getCollection(db, "products").insertMany([
    { productId: "1", title: "Clothing" },
    { productId: "2", title: "Food" },
    { productId: "3", title: "Gadgets" },
    { productId: "4", title: "Phones" },
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
