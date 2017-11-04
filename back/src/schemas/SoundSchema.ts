import connection from '../mongo'
import { Schema } from 'mongoose';
import { ISound } from '../interfaces/ISound';

class SoundSchema {
       
  static get schema () {
       var schema =  new Schema({
           name : {
               type: String,
               required: true
           },
           createdAt: {
               type: Date,
               required: true
           },
           source: {
               type: Buffer,
               required: true
           },
           favorite_users: [{ type : Schema.Types.ObjectId, ref: 'User' }]
       });
       
       return schema;
   }   
}
export = connection.model<ISound>("Sound", SoundSchema.schema);