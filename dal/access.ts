import  jsonfile from 'jsonfile';
import { Beeper } from '../models/Beeper.js';
import dotenv from "dotenv"

dotenv.config();

const DB_FILE_PATH = process.env.DB_FILE_PATH || './data/beepers.json';


export const writeToJsonFile = async (beeper: Beeper): Promise<void> => {
  const beepers: Beeper[] = await jsonfile.readFile(DB_FILE_PATH);
  beepers.push(beeper);
  await jsonfile.writeFile(DB_FILE_PATH, beepers);
};



export const readFromJsonFile = async (): Promise<Beeper[]> => {
  const beepers: Beeper[] = await jsonfile.readFile(DB_FILE_PATH);
  return beepers;
};


export const deleteFromJsonFile = async (beeper: Beeper ): Promise<void> => {
  const beepers: Beeper[] = await readFromJsonFile();
  const beeperFind: Beeper | undefined = beepers.find((b) => b.id === beeper.id);
  if (beeperFind) {
    const index  = beepers.findIndex((i) => i.id === beeperFind.id);
    beepers.splice(index, 1);
    await jsonfile.writeFile(DB_FILE_PATH, beepers);
  }
};

export const updateJsonFile = async (beeper: Beeper ): Promise<void> => {
  const beepers: Beeper[] = await readFromJsonFile();
  const beeperFind: Beeper | undefined = beepers.find((b) => b.id === beeper.id);
  if (beeperFind) {
    const index  = beepers.findIndex((i) => i.id === beeperFind.id);
    beepers.splice(index, 1, beeper);
    await jsonfile.writeFile(DB_FILE_PATH, beepers);
  }
};