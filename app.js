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


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
