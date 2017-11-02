import UserSchema = require('../schemas/UserSchema');
import { Repository }  from './Repository';
import { IUser } from '../interfaces/IUser';

export class UserRepository  extends Repository<IUser> {
    constructor () {
        super(UserSchema);
    }

    public getOrCreateByMail(email: string, callback : (error: any, result: IUser) => void) {
        this.findOne({'email': email}, (err, result) =>{
            if(err || result) {
                callback(err, result);
            }
            else {
                const data = { 'email': email };
                this.create(<IUser>data, (error, result) => {
                    callback(err, result);
                });
            }
        });
    }
} 

Object.seal(UserRepository);