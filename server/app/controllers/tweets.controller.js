// // Get User Tweet timeline by user ID
// // https://developer.twitter.com/en/docs/twitter-api/tweets/timelines/quick-start


// API_KEY = "9AjBWZC1kRhwKSUXxciAEyzaX"
// API_KEY_SECRET = "YgtK9ZgR7o19WItVUllEOsS6iL3Nq5gSSpgJFxqLtArOMcuyJB"
// BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAACMGjgEAAAAAljsKVCWKB24R1fPPOWW%2F%2BlezM0U%3DJefIXN4GojQFaOzfMnYaYdqoZi6EYJbay5vPizSN7l8vVUXhus"

const needle = require('needle');

// // this is the ID for @TwitterDev
// const userId = "2244994945";
// const url = `https://api.twitter.com/2/users/${userId}/tweets`;

// // The code below sets the bearer token from your environment variables
// // To set environment variables on macOS or Linux, run the export command below from the terminal:
// // export BEARER_TOKEN='YOUR-TOKEN'

// async function getUserTweets(){
//     let params = {
//         "max_results": 5,
//         "tweet.fields": "created_at",
//         "expansions": "author_id"
//     }

//     const options = {
//         headers: {
//             "User-Agent": "v2UserTweetsJS",
//             "authorization": `Bearer ${BEARER_TOKEN}`
//         }
//     }
//     try {
//         const resp = await needle('get', url, params, options);

//         if (resp.statusCode != 200) {
//             console.log(`${resp.statusCode} ${resp.statusMessage}:\n${resp.body}`);
//             return;
//         }
//         console.log(resp.body);
//     } catch (err) {
//         throw new Error(`Request failed: ${err}`);
//     }
// }

// getUserTweets()

BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAACMGjgEAAAAAljsKVCWKB24R1fPPOWW%2F%2BlezM0U%3DJefIXN4GojQFaOzfMnYaYdqoZi6EYJbay5vPizSN7l8vVUXhus"

async function getUser(){
    let params = {
    }

    const options = {
        headers: {
            "authorization": `Bearer ${BEARER_TOKEN}`
        }
    }
    try {
        const resp = await needle('get', "https://twitter.com/TwitterDev", params, options);

        if (resp.statusCode != 200) {
            console.log(`${resp.statusCode} ${resp.statusMessage}:\n${resp.body}`);
            return;
        }
        console.log(resp.body);
    } catch (err) {
        throw new Error(`Request failed: ${err}`);
    }
}

getUser()