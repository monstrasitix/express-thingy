import { UserRecord } from "@/database/collection";
import { InsertOneResult } from "mongodb";

export interface IUserService {
  getUsers(): Promise<UserRecord[]>;
  findUser(id: string): Promise<UserRecord | null>;
  addUser(animal: UserRecord): Promise<InsertOneResult<UserRecord>>;
  removeUser(id: string): void;
}
