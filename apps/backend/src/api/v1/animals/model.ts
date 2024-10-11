import { AnimalRecord } from "@/database/collection";
import { Collection, Db, InsertOneResult } from "mongodb";

export class AnimalModel {
  constructor(
    //
    protected db: Db,
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
