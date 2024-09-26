import  jsonfile from 'jsonfile';
import { Beeper } from '../models/Beeper.js';



const DB_FILE_PATH = process.env.DB_FILE_PATH || '.data//beepers.json';


export const writeOneToJsonFile = async (beeper: Beeper): Promise<void> => {
  const beepers: Beeper[] = await jsonfile.readFile(DB_FILE_PATH);
  beepers.push(beeper);
  await jsonfile.writeFile(DB_FILE_PATH, beepers);
};

export const writeAllToJsonFile = async (beeper: Beeper []): Promise<void> => {
  await jsonfile.writeFile(DB_FILE_PATH, beeper);
};

export const readFromJsonFile = async (): Promise<Beeper[]> => {
  const beepers: Beeper[] = await jsonfile.readFile(DB_FILE_PATH);
  return beepers;
};


