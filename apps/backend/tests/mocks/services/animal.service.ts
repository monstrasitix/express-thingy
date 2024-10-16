import { IAnimalService } from "@/api/v1/interfaces/animal.service";
import { AnimalRecord } from "@/database/collection";
import { InsertOneResult, ObjectId, WithId } from "mongodb";

export class MockAnimalService implements IAnimalService {
  private animals: WithId<AnimalRecord>[];

  constructor() {
    this.animals = [
      { _id: this.newId(), name: "John", type: "dog" },
      { _id: this.newId(), name: "Sally", type: "cat" },
    ];
  }

  private newId(): ObjectId {
    return ObjectId.createFromTime(Date.now());
  }

  async getAnimals(): Promise<AnimalRecord[]> {
    return this.animals;
  }

  async findAnimal(id: string): Promise<AnimalRecord | null> {
    const found = this.animals.find((animal) => animal._id.toString() === id);
    return found ? found : null;
  }

  async addAnimal(
    animal: AnimalRecord,
  ): Promise<InsertOneResult<AnimalRecord>> {
    const insertedId = this.newId();

    this.animals.push({ _id: insertedId, ...animal });

    return {
      acknowledged: true,
      insertedId,
    };
  }

  async removeAnimal(id: string) {
    this.animals = this.animals.filter(
      (animal) => !new ObjectId(id).equals(animal._id),
    );
  }
}
