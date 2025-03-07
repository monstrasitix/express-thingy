import { Db } from "mongodb";

type Collection = {
  products: {
    productId: string;
    title: string;
  };
};

export function getCollection<T extends keyof Collection>(db: Db, name: T) {
  return db.collection<Collection[T]>(name);
}
