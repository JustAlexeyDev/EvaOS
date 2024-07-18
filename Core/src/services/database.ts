import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(__dirname, '../../db.json');

export const readDB = (): any => {
  const data = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(data);
};

export const writeDB = (data: any): void => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};