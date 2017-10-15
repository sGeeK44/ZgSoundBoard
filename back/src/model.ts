import { Model } from "mongoose";
import { ISoundModel } from "./sound_model";

export interface IModel {
  user: Model<ISoundModel>;
}