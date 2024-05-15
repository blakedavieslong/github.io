const express = require('express');
const ideasRouter = express.Router();
const { getAllFromDatabase, getFromDatabaseById, deleteFromDatabasebyId, addToDatabase, updateInstanceInDatabase } = require('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');
module.exports = ideasRouter;


ideasRouter.param('ideaId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if(idea){
        req.idea = idea;
        next();
    } else {
        res.status(404).send('Idea not found.');
    }
});

ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {

    if (req.body.name &&
        typeof req.body.weeklyRevenue === 'number' &&
        typeof req.body.numWeeks === 'number' &&
        req.body.numWeeks > 0) {

        const newIdea = addToDatabase('ideas', req.body);
        res.status(201).send(newIdea);
    } else {
        res.status(400).send('New idea data is incorrect.')
    }
});

ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
});

ideasRouter.put('/:ideaId', (req, res, next) => {
    const updatedIdea = updateInstanceInDatabase('ideas', req.body);
    res.status(200).send(updatedIdea);
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
    deleteFromDatabasebyId('ideas', req.idea.id);
    res.status(204).send(`Idea ${req.idea} deleted.`);
});