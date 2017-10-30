import { Document } from 'mongoose';
import { ISound } from './ISound';

export interface IUser extends Document {
  email: string;
}