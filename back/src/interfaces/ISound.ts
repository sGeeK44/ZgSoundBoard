import { Document } from 'mongoose';
import { IUser } from './IUser';

export interface ISound extends Document {
  name: string;
  source: Buffer;
  createdAt: Date;
  favorite_users: IUser[];
  is_favorite(user: IUser): boolean;
  set_to_favorite(user: IUser): void;
  unset_to_favorite(user: IUser): void;
}