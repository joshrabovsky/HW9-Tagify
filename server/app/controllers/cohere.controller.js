const cohere = require('cohere-ai');
cohere.init('sak8EIJpcfaQFMdXc6079EmtqXlmG5qfBC2tQjJu')

const inputs = [
    'Am I still able to return my order?',
    'When can I expect my package?',
    'Do you ship overseas?'
]

const examples =  [
  ]


async function classify(){
    const response = await cohere.classify({
        inputs: inputs,
        examples: examples,
    });
    console.log(response.body)
}

const texts = [
    `“Junk fees cost” Americans tens of millions of dollars a year – weighing down family budgets and making it harder for people to pay their bills.`,
    `Millions of Americans will travel home for the holidays and will get hit with hidden “junk” fees from airlines, hotels – maybe even tickets for a holiday show the family wants to see.

    It isn't right. My Administration is taking actions to reduce or eliminate these surprise fees.`,
];

async function embed(){
    const response = await cohere.embed({
        texts: texts
    });
    console.log(response.body.embeddings)
}

// embed()

const templatePrompts = [
  [{"posts":["Back on track","Back to building good habits.", ""], "tags": ["tag", "tag", "tag"]}],
  [{"posts":["post","post"], "tags": ["tag", "tag", "tag"]}],
  [{"posts":["post","post"], "tags": ["tag", "tag", "tag"]}],
]
const userPrompt = []



async function generate(){

}

(async () => {
  const response = await cohere.generate({
    model: 'xlarge',
    prompt: 'Given a post, this program will generate relevant hashtags.\n\nPerson: \nPost: Back on track\nPost: Back to building good habits.\nPost: Great win tonight @WisconsinHerd !! Loved the crowd energy @alex_ante34 @Mamukelashvili5\nPost: Freak Woods\nPost: Great win tonight!!\nHashtag: Sport\n--\nPerson: \nPost: That was fast\nPost: If only we had taxed the rich maybe none of this would have happened\nPost: Shout out to all the workers at Twitter. You all built a vital place for connection and deserved so much better.\n\nMillions of people appreciate the space you built and the hard work that went into it. Thank you \nPost: Ticketmaster monopoly got you down?\nPost: Marijuana Pardons vs. Expungements: what’s the difference, and how could it affect you or a loved one?\nHashtag: Politics\n--\nPerson: \nPost: This makes a lot of sense to me\nPost: Hey, look, the places that saw the highest rent increases between Census 2016 & 2021 also have the biggest housing shortages.\n\nAt some point this has to stop being a coincidence, right?\nPost: Of the 19 places in Canada that saw their median nominal $ rents increase by more than $250 between 2016 and 2021, 17 were either in BC or Ontario.\nPost: Expanding it further.. there were 50 Census Divisions (out of 293) where rents went up by $150 or more, and 20% by more.\n\n21 in Ontario\n18 in BC\n7 in Manitoba (this surprised me)\n3 in the Territories\n1 in Atlantic Canada (Halifax)\n\nNone in Quebec, Alberta, and Sask.\nPost: Also, a reminder you can find me at @mikepmoffatt@masthead.social\nPost: Fun with data: @jesse_helmer generated some amazing graphs for us. Here\'s a fun one: York Region. It\'s quickly gone from a place Ontarians move to, to a place Ontarians move from.\nPost: As someone who wished that @andrew_leach was no longer on Twitter, this feels like a monkey’s paw moment.\nPost: On net, nearly 60,000 children have moved out of the City of Toronto, to other parts of the province, in the past 5 years. Note: That\'s *NET*, not gross.\nPost: York Region has:\n- The least affordable rents in Canada\n- The least affordable homes in Canada\n- The 2nd biggest housing shortage in Canada (after Peel Region)\n\nI don\'t think this is a coincidence.\nPost: Peel and York have major, major affordability issues and housing shortages.\nPost: There’s only been only approx 6,200 school days since 1989. \n\nI’m having a tough time believing that students have missed 2,200, or 35%, of those days due to strike.\nPost: Son of a… Wordle 516 3/6\nPost: Average rents in are up $3,500/yr in Ontario, over twice this salary increase.\nPost: This is unbelievably cool - must read!\nPost: I would sign this open letter\nPost: Incredibly timely piece from my @SP_Inst colleagues Michael Twigg and Christine Desrochers on the value of Ontario\'s Greenbelt.\nHashtag: ',
    max_tokens: 3,
    temperature: 1,
    num_generations: 4,
    k: 0,
    p: 0.75,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop_sequences: ["--"],
    return_likelihoods: 'ALL'
  });
  console.log(`Prediction: ${response.body.generations.length}`);
  console.log(`Prediction: ${response.body.generations[1].text}`);
  console.log(`Liklihood: ${response.body.generations[1].likelihood}`);
})();