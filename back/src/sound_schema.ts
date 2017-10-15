import { Schema } from "mongoose";

export var soundSchema: Schema = new Schema({  
  id: Number,
  createdAt: Date,
  name: String,
  source: Buffer
});
soundSchema.pre("save", function(next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});