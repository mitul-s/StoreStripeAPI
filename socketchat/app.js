const mongo  = require('mongodb').MongoClient;
const client = require('socket.io').listen(4000).sockets;

// Connect to MongoDB
mongo.connect('mongodb://127.0.0.1/mongochat', function (err, db) {
    if(err) {
        throw err;
    }
    console.log('MongoDB connected...');

    // Connect to Socket.io
    client.on('connection', function(socket){
        let chat = db.collection('chats');

        // Create function to send status to server
        sendStatus = function(s) {
            socket.emit('status', s);
        }

        // Get chat value
        chat.find().limit(100).sort({_id:1}).toArray(function(err, res){
            if(err){
                throw err;
            }

            // Emit message if no error
            socket.emit('output', res);
        });
        
        // Handle input from the client
        socket.on('input', function (data) {
            let name = data.name;
            let message = data.message;

            // Check for name & msg
            if(name === '' || message === '') {
                // Send error status
                sendStatus('Please enter a name & message!');
            } else {
                // Insert message into database
                chat.insert({name: name, message: message}, function(){
                    client.emit('output', [data]);

                    // Send status object
                    sendStatus({
                        message: 'Message sent',
                        clear: true
                    });
                });
            }
        });
        // Handle the clearing
        socket.on('clear', function (data) {
            // Remove all chats!
            chat.remove({}, function () {
                //Emit cleared.
                socket.emit();
            });
        });
    });
});