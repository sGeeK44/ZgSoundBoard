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
       
        schema.methods.is_favorite = function(user) {
            return this.favorite_users.find(userId => user != undefined && userId.toString() == user.id) != undefined
        };
       
        schema.methods.set_to_favorite = function(user) {
            if (this.is_favorite(user)) {
                return;
            }
            
            this.favorite_users.push(user);
            this.save();
        };
        
         schema.methods.unset_to_favorite = function(user) {
            let existing = this.favorite_users.find(userId => user != undefined && userId.toString() == user.id);
            if (existing == undefined) {
                return;
            }
             
            var index = this.favorite_users.indexOf(existing, 0);            
            this.favorite_users.splice(index, 1);
            this.save();
         };
       
        return schema;
   }
}
export = connection.model<ISound>("Sound", SoundSchema.schema);