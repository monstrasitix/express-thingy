// Dependencies
import { TYPES } from "@/di/types";
import { inject, injectable } from "inversify";
import { Collection, Db, InsertOneResult } from "mongodb";

// Types
import { UserRecord } from "@/database/collection";

@injectable()
export class UserService {
  constructor(@inject(TYPES.Mongo) protected db: Db) {}

  private get collection(): Collection<UserRecord> {
    return this.db.collection("users");
  }

  async getUsers(): Promise<UserRecord[]> {
    return this.collection.find().toArray();
  }

  async findUser(id: string): Promise<UserRecord | null> {
    return this.collection.findOne({ id });
  }

  async addUser(
    user: Omit<UserRecord, "id">,
  ): Promise<InsertOneResult<UserRecord>> {
    return this.collection.insertOne(user);
  }

  async removeUser(id: string) {
    await this.collection.deleteOne({ id });
  }
}
