const mongoose = require('mongoose');

//Set up default mongoose connection
let mongoDB = 'mongodb://127.0.0.1/hw2DB';
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
let db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Require mongoose package
let Schema = mongoose.Schema;

//Define BucketlistSchema with title, description and category
const StringInputSchema = Schema({
    string: String,
    length: Number,
});

const Stringinput = module.exports = mongoose.model('Stringinput', StringInputSchema );
