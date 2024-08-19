import { Request, Response } from "express";

type User = {
  id: string;
  firstName: string;
  lastName: string;
};

let users: User[] = [
  { id: "1", firstName: "John", lastName: "Doe" },
  { id: "2", firstName: "Sally", lastName: "Murphy" },
  { id: "3", firstName: "Kevin", lastName: "Sullivan" },
  { id: "4", firstName: "Devin", lastName: "Croft" },
];

export function getUsers(req: Request, res: Response<User[]>) {
  res.json(users);
}

export function getUser(
  req: Request<{ id: string }>,
  res: Response<User | null>,
) {
  const userId = req.params.id;

  res.json(users.find((user) => user.id === userId));
}

export function createUser(
  req: Request<null, null, Omit<User, "id">>,
  res: Response<User>,
) {
  const newUser: User = {
    id: Math.random().toString(),
    ...req.body,
  };

  users.push(newUser);
  res.json(newUser);
}

export function deleteUser(req: Request<{ id: string }>) {
  const userId = req.params.id;

  users = users.filter((user) => user.id !== userId);
}
