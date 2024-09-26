
import {Status}from '../statuses/status'

export interface Beeper{
  id:string
  name:string;
  status:string;
  created_at: Date;
  detonated_at?:Date;
  latitude?:number;
  longitude?:number;

 }



