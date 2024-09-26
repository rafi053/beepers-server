import { v4 as uuidv4 } from "uuid";
import {
  readFromJsonFile,
  writeToJsonFile,
  deleteFromJsonFile,
  updateJsonFile
} from "../dal/access.js";
import { Beeper } from "../models/Beeper.js";
import { Status } from "../statuses/status.js";
import { Latitude, Longitude } from '../coordinates/coordinates.js'

export const createBeeper = async (name: string): Promise<Beeper> => {
  const beeperId: string = uuidv4();

  const newBeeper: Beeper = {
    id: beeperId,
    name: name,
    status: Status.manufactured,
    created_at: new Date(),
    detonated_at: undefined,
    latitude: undefined,
    longitude: undefined,
  };
  await writeToJsonFile(newBeeper);
  return newBeeper;
};

export const getBeepers = async (): Promise<Beeper[] | undefined> => {
  const beepers: Beeper[] = await readFromJsonFile();
  return beepers;
};

export const getDetailsByID = async (id: string): Promise<Beeper> => {
  const beepers: Beeper[] = await readFromJsonFile();
  const beeperFind: Beeper | undefined = beepers.find(
    (beeper) => beeper.id === id
  );

  if (!beeperFind) {
    throw new Error("Invalid  ID of beeper.");
  }

  return beeperFind;
};

export const updateTheStatusOfBeeper = async (
  id: string, lat?: number, lon?: number
): Promise<string | undefined> => {
  const beeper: Beeper = await getDetailsByID(id);
  const oldStatus: string = beeper.status;
  const newStatus: string = getNextEnum(oldStatus);

  if (lat && lon) {
    if(oldStatus === 'shipped' && checkValidCords(lat, lon)){
    const newBeeper:Beeper= {...beeper}
    newBeeper.status = newStatus;
    newBeeper.latitude= lat;
    newBeeper.longitude= lon;
    // newBeeper.created_at = new Date() + 10;
    await  updateJsonFile(newBeeper);
    return newStatus;
  }}

  else{
    if (newStatus === 'Incorrect status') {
    return oldStatus;
    }
    else if(newStatus === 'It is not possible to change status after detonated'){
    return oldStatus;
    
  }

  else{
    const newBeeper:Beeper= {...beeper}
    newBeeper.status = newStatus;
    await  updateJsonFile(newBeeper);
    return newStatus;
  }};
}


  
  

   

  



export const deleteBeeperByID = async (id: string): Promise<void> => {
  const deleteBeeper: Beeper = await getDetailsByID(id);
  await deleteFromJsonFile(deleteBeeper);
};

export const getAllBeepersByStatus = async (
  status: string
): Promise<Beeper[] | undefined> => {
  const beepers: Beeper[] | undefined = await getBeepers();

  if (beepers) {
    const beepersFind: Beeper[] | undefined = beepers.filter(
      (beeper) => beeper.status === status
    );
    return beepersFind;
  }

 
};
function getNextEnum(status: string): string {
  let newStatus: string = '';
  switch (status) {
    case 'manufactured':
      newStatus = 'assembled';
      break;
    case 'assembled':
      newStatus = 'shipped';
      break;
    case 'shipped':
      newStatus = 'deployed';
      break;
    case 'deployed':
      newStatus = 'detonated';
      break;
    case 'detonated':
      newStatus = 'It is not possible to change status after detonated';
      break;
    default:
      newStatus = 'Incorrect status';
  }
  return newStatus;
}


function checkValidCords(lat: number, lon: number):boolean {
   let result: boolean = false;
   const lati: number[] = Latitude;
   const long: number[] = Longitude;
   const isLat: number = lati.indexOf(lat);
   const isLon: number = long.indexOf(lon);
   if (isLat && isLon === -1) {
     return result;
   }
  return true;
  }

// function setTime(params:number): number {
//   const time = setTimeout(() => {
//     setTimeout((stupor) => {
//       stupor,1000});
//   }, timeout);
//   return time;
// }
  