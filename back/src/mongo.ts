import mongoose = require("mongoose");

//connect to mongoose and create model
const MONGODB_CONNECTION: string = "mongodb://mongo:27017/zgsoundboard";
let connection: mongoose.Connection = mongoose.createConnection(MONGODB_CONNECTION);

export default connection;