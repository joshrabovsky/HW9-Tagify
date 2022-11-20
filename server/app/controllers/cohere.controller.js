const cohere = require('cohere-ai');
cohere.init('sak8EIJpcfaQFMdXc6079EmtqXlmG5qfBC2tQjJu')

const tweetsController = require("../controllers/tweets.controller.js");

const coherePromptTemplate = 'Post: Back on track\nPost: Back to building good habits.\nPost: Great win tonight @WisconsinHerd !! Loved the crowd energy @alex_ante34 @Mamukelashvili5\nPost: Freak Woods\nPost: Great win tonight!!\nHashtag: Sports\n--\nPost: That was fast\nPost: If only we had taxed the rich maybe none of this would have happened\nPost: Shout out to all the workers at Twitter. You all built a vital place for connection and deserved so much better. Millions of people appreciate the space you built and the hard work that went into it. Thank you \nPost: Ticketmaster monopoly got you down?\nPost: Marijuana Pardons vs. Expungements: what’s the difference, and how could it affect you or a loved one?\nHashtag: Politics\n--\nPost:'

const asyncGetCohereGeneration =  async function (coherePrompt) {
  const response = await cohere.generate({
    model: 'xlarge-20221108',
    prompt: coherePrompt,
    max_tokens: 4,
    temperature: 0.9,
    num_generations: 4,
    k: 0,
    p: 1,
    frequency_penalty: 0.2,
    presence_penalty: 0,
    stop_sequences: ["--"],
    return_likelihoods: 'GENERATION'
  });
  if (response.statusCode !== 200) {
        if (response.statusCode === 403) {
            res.status(403).send(response.body);
        } 
        else {
            throw new Error(response.body.error.message);
        }
    }
    if (response.body.generations){
        return response.body.generations;
    }else{
        throw new Error("Unsuccessful Request");
    }
};

const createPrompt = (data) => {
    let tweets = data.map((el) => {
        return el.text.replaceAll("\n", "")
    })
    return `${coherePromptTemplate}${tweets.join("\nPost: ")}\nHashtag: #`
}

const labelAccount = async (req, res) => {
    try {
        console.log('A')
        let userId = await tweetsController.asyncGetTwitterUserId(req.params.id);
        console.log('B')
        let allData = await tweetsController.asyncGetTwitterUserTags(userId);
        console.log('C')
        let tweets = allData.data
        console.log('E')
        let cleanedTweets = tweetsController.cleanData(tweets)
        console.log('F')
        let sortedTweets = tweetsController.analyzeData(cleanedTweets)
        console.log('G')
        let top10Tweets = sortedTweets.slice(0, sortedTweets.length > 20 ? 20 : sortedTweets.length)
        console.log('H')
        let coherePrompt = createPrompt(top10Tweets)
        console.log(coherePrompt)
        let generations = await asyncGetCohereGeneration(coherePrompt)
        return res.send(generations)
    } catch (error) {
        res.send(error);
    }
}

exports.labelAccount = labelAccount
