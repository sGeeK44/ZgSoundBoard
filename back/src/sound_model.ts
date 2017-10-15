import { Document } from "mongoose";
import { ISound } from "../../business/ISound";

export interface ISoundModel extends ISound, Document {
  //custom methods for your model would be defined here
}