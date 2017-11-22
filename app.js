const express    = require('express');
const stripe     = require('stripe')("sk_test_YEGQLxLvxfLtvDzP7h389Z2K");
const bodyParser = require('body-parser');
const expHandleBars = require("express-handlebars");

const app = express();

// HANDLEBARS Middleware
app.engine('handlebars', expHandleBars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// BODY PARSER Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Set Static folder
app.use(express.static(`${__dirname}/public`));

// INDEX Route
app.get('/', (req, res) => {
  res.render('index');
});

// Charging route
app.post('/charge', (req, res) => {
    const amount = 2500;
    // console.log(req.body);
    // res.send('Test');
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    })
    .then(customer => stripe.charges.create({
        amount,
        description: 'Gone Girl Ebook',
        currency: 'cad',
        customer: customer.id
    }))
    .then(charge => res.render(`success`));
});


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
