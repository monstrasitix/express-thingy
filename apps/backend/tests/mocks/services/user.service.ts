import { IUserService } from "@/api/v1/interfaces/user.service";
import { UserRecord } from "@/database/collection";
import { InsertOneResult, ObjectId, WithId } from "mongodb";

export class MockUserService implements IUserService {
  private users: WithId<UserRecord>[];

  constructor() {
    this.users = [
      { _id: this.newId(), firstName: "John", lastName: "Doe" },
      { _id: this.newId(), firstName: "Sally", lastName: "Doe" },
    ];
  }

  private newId(): ObjectId {
    return ObjectId.createFromTime(Date.now());
  }

  async getUsers(): Promise<UserRecord[]> {
    return this.users;
  }

  async findUser(id: string): Promise<UserRecord | null> {
    const found = this.users.find((animal) => animal._id.equals(id));
    return found ? found : null;
  }

  async addUser(user: UserRecord): Promise<InsertOneResult<UserRecord>> {
    const insertedId = this.newId();

    this.users.push({ _id: insertedId, ...user });

    return {
      acknowledged: true,
      insertedId,
    };
  }

  async removeUser(id: string) {
    this.users = this.users.filter(
      (user) => !new ObjectId(id).equals(user._id),
    );
  }
}
