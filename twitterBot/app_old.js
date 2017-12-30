console.log('Bot is running!');

/* get() --> search by hashtag, location, user, etc.
post() --> post a tweet!
stream() --> a continuous connection, whenever something happens in twitter (@mention), the bot acts */

const Twit = require('twit');
const config = require('./config');
const T = new Twit(config);

// STREAM Request

// // Set up user stream
// const stream = T.stream('user');

// // Anytime a user follows me, they'll receive a tweet
// stream.on('follow', followed);

// function followed(eventMsg) {
//     console.log("Follow event starting");
//     const name = eventMsg.source.name;
//     const screenName = eventMsg.source.screen_name;
//     tweetIt('@' + screenName + ' Thank you for the follow!');
// }


// STREAM Request for Tweets
const stream = T.stream('user');

stream.on('tweet', tweetEvent);

function tweetEvent(eventMsg) {
    // const fs = require('fs');
    const replyto = eventMsg.in_reply_to_screen_name;
    const text = eventMsg.text;
    const from = eventMsg.user.screen_name;

    // This is for a future idea
    // const signal = text.charAt(replyto.length + 2);
    // const stock = text.slice(replyto.length + 3, replyto.length + 7);
    
    // console.log(replyto + ' ' + from);
    // console.log(from.length);
    // console.log(text);
    // console.log(text.length);
    // console.log(text.slice(replyto.length + 2, replyto.length + 3));

    // if (signal == '$') {
    //     console.log(stock);
    //     const newTweet = '@' + from + ' testing.';
    //     tweetIt(newTweet);
    // }
}

// GET request
const params = {
    q: "trump",
    count: 10
}

T.get('search/tweets', params, gotData);

function gotData(err, data, response) {
    const tweets = data.statuses;
    for(let i = 0; i < tweets.length; i++) {
        console.log(tweets[i].text)
    }
}

// Post Request

// setInterval(tweetIt, 1000 * 20)

function tweetIt(txt) {

    let r = Math.floor(Math.random()*1000);

    const tweet = {
        // status: 'bot tweets ' + r
        status: txt
    }

    T.post('statuses/update', tweet, tweeted)
    function tweeted(err, data, response) {
        if (err) {
            console.log("Something went wrong!");
        } else {
            console.log("Tweet posted!");
        }
    }
}
