import { AnimalRecord } from "@/database/collection";
import { InsertOneResult } from "mongodb";

export interface IAnimalService {
  getAnimals(): Promise<AnimalRecord[]>;
  findAnimal(id: string): Promise<AnimalRecord | null>;
  addAnimal(animal: AnimalRecord): Promise<InsertOneResult<AnimalRecord>>;
  removeAnimal(id: string): void;
}
