const cohere = require('cohere-ai');
cohere.init('sak8EIJpcfaQFMdXc6079EmtqXlmG5qfBC2tQjJu')

const inputs = [
    'Am I still able to return my order?',
    'When can I expect my package?',
    'Do you ship overseas?'
]

const examples =  [
    {text: 'Do you offer same day shipping?', label: 'Shipping and handling policy'},
    {text: 'Can you ship to Italy?', label: 'Shipping and handling policy'},
    {text: 'How long does shipping take?', label: 'Shipping and handling policy'},
    {
      text: 'Can I buy online and pick up in store?',
      label: 'Shipping and handling policy'
    },
    {text: 'What are your shipping options?', label: 'Shipping and handling policy'},
    {
      text: 'My order arrived damaged, can I get a refund?',
      label: 'Start return or exchange'
    },
    {text: 'You sent me the wrong item', label: 'Start return or exchange'},
    {
      text: 'I want to exchange my item for another colour',
      label: 'Start return or exchange'
    },
    {
      text: 'I ordered something and it wasn\'t what I expected. Can I return it?',
      label: 'Start return or exchange'
    },
    {text: 'What\'s your return policy?', label: 'Start return or exchange'},
    {text: 'Where\'s my package?', label: 'Track order'},
    {text: 'When will my order arrive?', label: 'Track order'},
    {text: 'What\'s my shipping number?', label: 'Track order'},
    {text: 'Which carrier is my package with?', label: 'Track order'},
    {text: 'Is my package delayed?', label: 'Track order'}
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

const prompt = ``

async function generate(){

}