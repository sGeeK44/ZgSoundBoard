import { Document } from 'mongoose';

export interface ISound extends Document {
  name: string;
  source: Buffer;
  createdAt: Date;
}