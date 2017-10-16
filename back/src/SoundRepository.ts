import connection from './mongo'
import { Document, Schema } from "mongoose";
import { ISound } from "./ISound";

export var soundSchema: Schema = new Schema({  
  id: Number,
  createdAt: Date,
  name: String,
  source: Buffer
});

soundSchema.pre("save", function(next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});
soundSchema.method('GetAll', callback => {
  soundRepository.find(callback);
})

export interface ISoundRepository extends ISound, Document {
  GetAll(callback?: (err: any, res: ISound[]) => void);
}

export var soundRepository = connection.model<ISoundRepository>("Sound", soundSchema);