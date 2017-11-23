const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const nexmo = require('nexmo');
const socketio = require('socket.io');

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

// Define a port to start the server
const port = 3000;

// Start server
const server = app.listen(port, () => console.log(`Server running on ${port}`));
