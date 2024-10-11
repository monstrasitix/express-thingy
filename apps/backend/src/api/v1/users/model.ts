import { UserRecord } from "@/database/collection";
import { Collection, Db, InsertOneResult } from "mongodb";

export class UserModel {
  constructor(
    //
    protected db: Db,
  ) {}

  private get collection(): Collection<UserRecord> {
    return this.db.collection("users");
  }

  async getUsers(): Promise<UserRecord[]> {
    return this.collection.find().toArray();
  }

  async findUSer(id: string): Promise<UserRecord | null> {
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
