import UserSchema = require('../schemas/UserSchema');
import { Repository }  from './Repository';
import { IUser } from '../interfaces/IUser';

export class UserRepository  extends Repository<IUser> {
    constructor () {
        super(UserSchema);
    }

    public getOrCreateByMail(email: string, user: IUser){
        this.findOne({'email': email}, (err, result) =>{
            if(err){console.log("Erreur lors de la recherche de l'utilisateur "+email)}
            else if(result){
                console.log('user already exist')
                user=result
            }
            else{
                console.log('user not already exist')
                const data = {'email': email}
                this.create(<IUser>data, (error, result) => {
                    if(error) {"Erreur lors de la creation de l'utilisateur "+email+". "+error}
                    else {
                        user=result
                        console.log("user create "+result);
                    }
                });
            }
        });
    }
} 

Object.seal(UserRepository);