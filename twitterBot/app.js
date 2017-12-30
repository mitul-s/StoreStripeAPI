console.log('Bot is running.');

// Connecting the Twitter API
const Twit = require('twit');
const config = require('./config');
const T = new Twit(config);

const fetch = require('node-fetch');
var stockPrice;

// Connecting Live Stock Data API
function getStockData(stock, signal, from) {
    fetch('https://api.iextrading.com/1.0/stock/'+stock+'/quote')
    .then((res) => res.json())
    .then((data) => {
        console.log(data.latestPrice);
        stockPrice = data.latestPrice;
        if (signal === "$") {
            console.log(stock);
            const newTweet = '@' + from + ' Price: $' + stockPrice;
            tweetIt(newTweet);
        }
    })
    .catch(function(err){
        console.log("Error: " + err);
    });
};

// Twitter STREAM Request
const stream = T.stream('user');
stream.on('tweet', tweetEvent);

function tweetEvent(eventMsg) {
    const replyto = eventMsg.in_reply_to_screen_name;
    const text = eventMsg.text;
    const from = eventMsg.user.screen_name;
    const signal = text.charAt(replyto.length + 2);
    const stock = text.slice(replyto.length + 3, replyto.length + 7);
    getStockData(stock, signal, from);   
}


function tweetIt(txt) {

    const tweet = {status: txt}

    T.post('statuses/update', tweet, tweeted);

    function tweeted(err, data, response) {
        if (err) {
            console.log("Something went wrong!");
        } else {
            console.log("Tweet posted!");
        }
    }
}