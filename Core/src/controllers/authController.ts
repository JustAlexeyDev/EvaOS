import { Request, Response } from 'express';
import { readDB, writeDB } from '../services/database';
import { User } from '../models/User';

export const register = (req: Request, res: Response): void => {
  const { username, password } = req.body;
  const db = readDB();
  const user: User = { id: db.users.length + 1, username, password };
  db.users.push(user);
  writeDB(db);
  res.status(201).json({ message: 'User registered successfully' });
};

export const login = (req: Request, res: Response): void => {
  const { username, password } = req.body;
  const db = readDB();
  const user = db.users.find((u: User) => u.username === username && u.password === password);
  if (user) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};