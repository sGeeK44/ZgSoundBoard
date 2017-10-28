import SoundSchema = require('../schemas/SoundSchema');
import { Repository }  from './Repository';
import { ISound } from '../interfaces/ISound';

export class SoundRepository  extends Repository<ISound> {
    constructor () {
        super(SoundSchema);
    }    
} 

Object.seal(SoundRepository);