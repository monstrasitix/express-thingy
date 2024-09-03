import { Db } from "mongodb";

type Collection = {
  users: User;
  animals: Animal;
};

export type User = {
  firstName: string;
  lastName: string;
};

export type Animal = {
  type: string;
  name: string;
};

export function getCollection<T extends keyof Collection>(db: Db, name: T) {
  return db.collection<Collection[T]>(name);
}
