const express = require('express');
const quotesRouter = express.Router();

module.exports = quotesRouter;

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

quotesRouter.get('/random', (req, res) => {
    res.send({quote: getRandomElement(quotes)});
});

quotesRouter.get('/', (req, res) => {
    const searchPerson = req.query.person;
    let returnArray;
    
    if(searchPerson) {
        returnArray = quotes.filter((quote) => quote.person === searchPerson);
    } else {
        returnArray = quotes;
        
    }
    res.send({quotes: returnArray});
});

quotesRouter.post('/', (req, res) => {
    const author = req.query.person;
    const quote = req.query.quote;
    let newQuote;

    if (author && quote) {
        newQuote = {
            quote: quote,
            person: author
        };
        quotes.push(newQuote);
        res.status(201).send({quote: newQuote});
    } else {
        res.status(400).send('Quote invalid.');
    }
});