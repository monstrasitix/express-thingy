import { Db } from "mongodb";

type Collection = {
  users: UserRecord;
  animals: AnimalRecord;
};

export type UserRecord = {
  firstName: string;
  lastName: string;
};

export type AnimalRecord = {
  type: string;
  name: string;
};

export function getCollection<T extends keyof Collection>(db: Db, name: T) {
  return db.collection<Collection[T]>(name);
}
