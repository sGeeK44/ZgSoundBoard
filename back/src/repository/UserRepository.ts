import UserSchema = require('../schemas/UserSchema');
import { Repository }  from './Repository';
import { IUser } from '../interfaces/IUser';

export class UserRepository  extends Repository<IUser> {
    constructor () {
        super(UserSchema);
    }
} 

Object.seal(UserRepository);