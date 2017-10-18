import connection from './mongo'
import { Schema } from 'mongoose';
import { ISound } from './ISound';

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
           }
       });
       
       schema.pre("save", function(next) {
        if (!this.createdAt) {
          this.createdAt = new Date();
        }
        next();
      });
       
       return schema;
   }   
}
export = connection.model<ISound>("Sound", SoundSchema.schema);