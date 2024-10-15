// Dependencies
import { TYPES } from "@/di/types";
import { inject, injectable } from "inversify";
import { Collection, Db, InsertOneResult } from "mongodb";

// Types
import { AnimalRecord } from "@/database/collection";

@injectable()
export class AnimalService {
  constructor(
    //
    @inject(TYPES.Mongo) protected db: Db,
  ) {}

  private get collection(): Collection<AnimalRecord> {
    return this.db.collection("animals");
  }

  async getAnimals(): Promise<AnimalRecord[]> {
    return this.collection.find().toArray();
  }

  async findAnimal(id: string): Promise<AnimalRecord | null> {
    return this.collection.findOne({ id });
  }

  async addAnimal(
    animal: Omit<AnimalRecord, "id">,
  ): Promise<InsertOneResult<AnimalRecord>> {
    return this.collection.insertOne(animal);
  }

  async removeAnimal(id: string) {
    await this.collection.deleteOne({ id });
  }
}
