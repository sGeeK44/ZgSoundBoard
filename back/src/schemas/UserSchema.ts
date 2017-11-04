import { Document, Schema, Model, model} from "mongoose";

import connection from '../mongo'
import { IUser} from "../interfaces/IUser"

class UserSchema{

    static get schema(){
        return new Schema({
            email: {
                type: String,
                required: true,
                unique: true
            },
        })
    }

}
export = connection.model<IUser>("User", UserSchema.schema)