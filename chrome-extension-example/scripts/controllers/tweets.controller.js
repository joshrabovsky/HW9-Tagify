const needle = require('needle');
// // Get User Tweet timeline by user ID
// // https://developer.twitter.com/en/docs/twitter-api/tweets/timelines/quick-start
const API_KEY = "9AjBWZC1kRhwKSUXxciAEyzaX"
const API_KEY_SECRET = "YgtK9ZgR7o19WItVUllEOsS6iL3Nq5gSSpgJFxqLtArOMcuyJB"
const BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAACMGjgEAAAAAljsKVCWKB24R1fPPOWW%2F%2BlezM0U%3DJefIXN4GojQFaOzfMnYaYdqoZi6EYJbay5vPizSN7l8vVUXhus"
const headers = {
    "Authorization": `Bearer ${BEARER_TOKEN}`
}


const asyncGetTwitterUserId = async (userName) => {
    try{
        let query = `https://api.twitter.com/2/users/by/username/${userName}`
        let options = {
            headers: headers,
            "User-Agent": "v2RecentSearchJS"
        }
        let params = {
            "user.fields": "description"
        }
        const response = await needle('get', query, params, options)
        
        if (response.statusCode !== 200) {
            if (response.statusCode === 403) {
                res.status(403).send(response.body);
            } 
            else {
                throw new Error(response.body.error.message);
            }
        }
        if (response.body){
            return [response.body.data.id, response.body.data.name, response.body.data.description];
        }else{
            throw new Error("Unsuccessful Request");
        }
    }catch (error) {
        console.log(error.response.body);
    }
}

exports.asyncGetTwitterUserId = asyncGetTwitterUserId

const asyncGetTwitterUserTags = async (userId) => {
    let options = {
        headers: headers,
    }
    let params = {
        "tweet.fields": "public_metrics",
        "max_results": 100
    }
    let query = `https://api.twitter.com/2/users/${userId}/tweets`
    const response = await needle('get', query, params, options)
    return response.body
}

exports.asyncGetTwitterUserTags = asyncGetTwitterUserTags

const analyzeData = (data) => {
    return data.sort(function (x1, x2) {
        let publicMet1 = x1.public_metrics
        let total1 = parseInt(publicMet1.retweet_count) + parseInt(publicMet1.reply_count) + parseInt(publicMet1.like_count) + parseInt(publicMet1.quote_count)
        let publicMet2 = x2.public_metrics
        let total2 = parseInt(publicMet2.retweet_count) + parseInt(publicMet2.reply_count) + parseInt(publicMet2.like_count) + parseInt(publicMet2.quote_count)
        return total2 - total1
    })
}


exports.analyzeData = analyzeData

const cleanData = (data) => {
    return data.filter((tweet) => {
        let text = tweet.text
        if (text.length < 10 || text.includes("https://") || text.includes("http://") || text.split(" ").length < 5 || text.includes("@")){
            return false
        }
        return true
    })
}

exports.cleanData = cleanData

const getTwitterUserTags = async (req, res) => {
    try {
        let userId = await asyncGetTwitterUserId(req.params.id);
        let allData = await asyncGetTwitterUserTags(userId);
        let tweets = allData.data
        let filteredTweets = cleanData(tweets)
        let sortedTweets = analyzeData(filteredTweets)
        res.send(sortedTweets)
    } catch (error) {
        res.send(error);
    }
}

exports.getTwitterUserTags = getTwitterUserTags