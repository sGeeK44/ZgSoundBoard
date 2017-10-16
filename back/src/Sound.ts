import {ISound} from "./ISound"

export class Sound implements ISound{
    name: string;
    source: Buffer;
    createdAt: Date;
  }