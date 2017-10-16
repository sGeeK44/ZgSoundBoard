import "mocha";
import { Sound } from "../Sound";
import { ISound } from "../ISound";
import { ISoundRepository } from "../SoundRepository";
import { soundSchema } from "../SoundRepository";
import { suite, test } from "mocha-typescript";
import mongoose = require("mongoose");

@suite
class SoundTest {

  //store test data
  private data: ISound;

  //the User model
  public static SoundModel: mongoose.Model<ISoundRepository>;

  public static before() {
    //use q promises
    global.Promise = require("q").Promise;

    //use q library for mongoose promise
    mongoose.Promise = global.Promise;

    //connect to mongoose and create model
    const MONGODB_CONNECTION: string = "mongodb://mongo:27017/zgsoundboard";
    let connection: mongoose.Connection = mongoose.createConnection(MONGODB_CONNECTION);
    SoundTest.SoundModel = connection.model<ISoundRepository>("Sound", soundSchema);

    //require chai and use should() assertions
    let chai = require("chai");
    chai.should();
  }

  constructor() {
    this.data = new Sound();
    this.data.name = "t'es malade";
  }

  @test("should create a new User")
  public create() {  
    //create sound and return promise
    return new SoundTest.SoundModel(this.data).save().then(result => {            
      //verify _id property exists
      result._id.should.exist;

      //verify email
      result.name.should.equal(this.data.name);
    });
  }
}
