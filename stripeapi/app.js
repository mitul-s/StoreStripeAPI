const express = require('express');
const keys = require('./config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const bodyParser = require('body-parser');
const ejs = require('ejs');

// Initialize app
const app = express();

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// View engine setup, middleware
app.set('view engine', 'ejs');

// Set up static content folder
app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.render('index', {
        stripePublishableKey: keys.stripePublishableKey
    });
});


// Charging Route for Stripe
app.post('/charge', (req, res) => {
    const amount = 2500;
    // console.log(req.body);
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    })
    .then(customer => stripe.charges.create({
        amount,
        description: 'Movie Life Lightroom Presets',
        currency: 'cad',
        customer: customer.id
    }))
    .then(charge => res.render("success"));
});

// Set up port and server
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});