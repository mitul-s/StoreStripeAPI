import { loadavg } from 'os';
import { log } from 'util';

const mongo  = require('mongodb').MongoClient;
const client = require('socket.io').listen(4000).sockets;

// Connect to MongoDB
mongo.connect('mongodb://127.0.0.1/mongochat', function(err, db){
    if(err) {
        throw err;
    }
    console.log('Mongodb connected!');
})