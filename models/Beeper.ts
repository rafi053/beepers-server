
import {Status}from './status'

export interface Beeper{
  id:string
  name:string;
  status:Status;
  DateCreation?: Date;
  DateExplosion?:Date;
  Longitude?:number;
  Latitude?:number;

 }



