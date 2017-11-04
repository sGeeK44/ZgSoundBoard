import { Document } from 'mongoose';
import { IUser } from './IUser';

export interface ISound extends Document {
  name: string;
  source: Buffer;
  createdAt: Date;
  favorite_users: IUser[];
}