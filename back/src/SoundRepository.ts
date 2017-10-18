import SoundSchema = require('./SoundSchema');
import { Repository }  from './Repository';
import { ISound } from './ISound';

export class SoundRepository  extends Repository<ISound> {
    constructor () {
        super(SoundSchema);
    }    
} 

Object.seal(SoundRepository);