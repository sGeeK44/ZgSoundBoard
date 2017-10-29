import UserSchema = require('../schemas/UserSchema');
import { Repository }  from './Repository';
import { IUser } from '../interfaces/IUser';

export class UserRepository  extends Repository<IUser> {
    constructor () {
        super(UserSchema);
    }

    public findByEmail(email: string, callback: (error: any, result: any) => void) : void{
        this.model.findOne({'email': email}, 'email', callback);
    }
} 

Object.seal(UserRepository);