import { Request, Response } from "express";

type Animal = {
  id: string;
  type: string;
  name: string;
};

let animals: Animal[] = [
  { id: "1", type: "Dog", name: "Doug" },
  { id: "2", type: "Cat", name: "Kirry" },
  { id: "3", type: "Fish", name: "Blob" },
];

export function getAnimals(req: Request, res: Response<Animal[]>) {
  res.json(animals);
}

export function getAnimal(
  req: Request<{ id: string }>,
  res: Response<Animal | null>,
) {
  const animalId = req.params.id;

  res.json(animals.find((animal) => animal.id === animalId));
}

export function createAnimal(
  req: Request<null, null, Omit<Animal, "id">>,
  res: Response<Animal>,
) {
  const newAnimal: Animal = {
    id: Math.random().toString(),
    ...req.body,
  };

  animals.push(newAnimal);
  res.json(newAnimal);
}

export function deleteAnimal(req: Request<{ id: string }>) {
  const animalId = req.params.id;

  animals = animals.filter((animal) => animal.id !== animalId);
}
