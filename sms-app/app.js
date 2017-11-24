const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const Nexmo = require('nexmo');
const socketio = require('socket.io');

// Initialzie Nexmo API
const nexmo = new Nexmo({
    apiKey: '7d506976',
    apiSecret: 'd2eb538fac815767'
}, {debug: true});


// Initialize application with express
const app = express();

// Template engine set up
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

// Public folder set up
app.use(express.static(`${__dirname}/public`));

// BODY PARSER Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Define the index route
app.get('/', (req, res) => {
    res.render('index');
});

// Catch form submit
app.post('/', (req, res) => {
    // res.send(req.body);
    // console.log(req.body);
    const number = req.body.number;
    const text = req.body.text;

    nexmo.message.sendSms(
      '16024919396', number, text, {type: 'unicode'},
      (err, responseData) => {
      if(err) {
        console.log(err);
      } else {
        console.dir(responseData);
        // Get data from response
        const data = {
          id: responseData.messages[0]['message-id'],
          number: responseData.messages[0]['to']
        }
        //Emit data to the client
        io.emit('smsStatus', data);
      }
    }
    );
})

// Define a port to start the server
const port = 3000;

// Start server
const server = app.listen(port, () => console.log(`Server running on ${port}`));


// Connect to socket.io
const io = socketio(server);
io.on('connect', (socket) => {
  console.log('Connected fam');
  io.on('disconnect', () => {
    console.log('Disconnected');
  })
})
