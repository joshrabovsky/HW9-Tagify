const cohere = require('cohere-ai');
cohere.init('sak8EIJpcfaQFMdXc6079EmtqXlmG5qfBC2tQjJu')

const tweetsController = require("../controllers/tweets.controller.js");

const coherePromptTemplate = `Person: Lebron James
Post: It started in Crenshaw, now the marathon continues.Stay tuned for #HUSSLED @makespringhill #LegendsNeverDie
Post: Prayers to @UVAFootball program and the families who lost their Young kings!! Sad Sad Sad 
Post: By FAR the game of the YEAR that was!! WOW WOW WOW
Post: LONG LIVE THE MAN!!! Sky high YOUNG KING P TAKEOFF
Post: I told you guys that I don’t believe in sharing hurtful information. And I’ll continue to be that way but Kyrie apologized and he should be able to play. That’s what I think. It’s that simple.  Help him learn- but he should be playing. What he’s asked to do to get back on the floor I think is excessive IMO. He’s not the person that’s being portrayed of him. Anyways back to my rehab session.
Post: I’m gone be honest 20 mins into it, I just had to stop watching “UNTOLD” OPERATION FLAGRANT FOUL. Especially with having a  game tomorrow and I probably won’t finish it until i retire. Can’t have my mind feeling a way!
Post: Now when I need the rest I can't SLEEP!!
Post: Who knew all I needed was a LeBreakthrough. Appreciate my #GodofWarRagnaroko support team @BenStiller and John Travolta! st @PlayStation #PlayStationPartner
Post: I dont know Elon Musk and, tbh, I could care less who owns twitter.  But I will say that if this is true, I hope he and his people take this very seriously because this is scary AF.  So many damn unfit people saying hate speech is free speech.
Hashtag: #Basketball
--
Person: Joe Biden
Post: America is writing that we can lead the world in manufacturing again.
Post: Congratulations Naomi and Peter! We love you.
Post: We’ve made COVID vaccines free and available. We’ve made tests free and available. We’ve made treatments like Paxlovid free and available. Please use them. And encourage your friends and loved ones and neighbours to use them as well. It can save a life.
Post: Through our infrastructure investment, we're providing affordable, high-speed internet for every American. Now, folks from rural Appalachia to big cities can get connected to internet reliably for schoolwork, telemedicine, starting a business, and so much more.
Post: With the CHIPS and Science Act, we’re ensuring more American-made technology, making more microchips at home, and creating tens of thousands of manufacturing jobs. We're leading the manufacturing boom.
Post: “Junk fees cost” Americans tens of millions of dollars a year – weighing down family budgets and making it harder for people to pay their bills.
Post: My Administration is building a world-class workforce that is ready to compete.
Hashtag: #President
--
Person: The Weekend
Post: 20 thousand likes, almost 2 thousand replies and not a single …. CONFESSSION !
Post: THE #1 station to free your soul. DAWN 103.5
Post: I look STRESSED in this picture Wtf had me this worked?
Post: yeah but for example birds part 2 on original is wayyyy better sounding than on trilogy … my personal opinion
Post: I might get rid of the compilation just so there’s no more confusion, now that ALL the samples are finally cleared since December 17, 2021
Post: if y’all wanna hear the trilogy how it’s supposed to be listened to … listen to House of Balloons, Thursday and Echoes of Silence individually. not all samples are on trilogy and the mix isn’t the original mix. But shout out trilogy but fyi, for the new fans, it isn’t an album
Post: dawn fm still slaps front to back
Post: WHAT ? naw this is the best gif. I just stumbled on it… LOL
Post: when you find another person listening to dawn fm and realize it’s a mirror
Hashtag: #Muscian
--
Person: Damien Hirst
Post: The Currency The year is over boom that was quick! and we have all had to decide: NFT or physical? The final numbers are: 5,149 physicals and 4,851 NFTs (meaning I will have to burn 4,851 corresponding physical Tenders).
Post: I have already learnt so much and it’s only been a year and I am so proud to have created something alive, something mad and provocative and been a passenger (along with all the other participants in the currency) and to help build a fantastic community on @HENI
Post: Long may it last and I can’t wait for the next twists and turns. The road is long and the world’s our oyster and all that! Who knows where but here we go!
Post: Cherry blossom show now on at japanese the national art center Tokyo @NACT_PR, if you are passing pop in! 
Post: My Cherry Blossoms show opens on the 2nd of March at The National Art Center, Tokyo, @NACT_PR
. Pop by and see it if you can! Here are some images from the show at @Fond_Cartier.
Post: My show Relics and Fly Paintings is now on at the @Gagosian Britannia St, London.
Post: The REDEMPTION of my HashtagCURRENCY project has started !! This is the first people exchanging their NFT TENDERS for the physical TENDERS (the physical art) at my Claridge’s show. Oh my goodness what have I done? And what does it even mean??? Boiiiinngggg!!! HELP!: 
Hashtag: #Artist
--`

const asyncGetCohereGeneration =  async function (coherePrompt) {
  const response = await cohere.generate({
    model: 'xlarge-20221108',
    prompt: coherePrompt,
    max_tokens: 3,
    temperature: 0.7,
    num_generations: 5,
    k: 0,
    p: 1,
    frequency_penalty: 0.5,
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

const createPrompt = (username, desc, data) => {
    let tweets = data.map((el) => {
        return el.text.replaceAll("\n")
    })
    return `${coherePromptTemplate}\nPerson: ${username}\nPost: ${desc}\nPost: ${tweets.join("\nPost: ")}\nHashtag:`
}

const labelAccount = async (req, res) => {
    try {
        let [userId, userName, userDescription] = await tweetsController.asyncGetTwitterUserId(req.params.id);
        let allData = await tweetsController.asyncGetTwitterUserTags(userId);
        let tweets = allData.data
        let cleanedTweets = tweetsController.cleanData(tweets)
        let sortedTweets = tweetsController.analyzeData(cleanedTweets)
        let top10Tweets = sortedTweets.slice(0, sortedTweets.length > 9 ? 9 : sortedTweets.length)
        let coherePrompt = createPrompt(userName, userDescription, top10Tweets)
        console.log(coherePrompt)
        let generations = await asyncGetCohereGeneration(coherePrompt)
        return res.send(generations)
    } catch (error) {
        res.send(error);
    }
}

exports.labelAccount = labelAccount
