const express = require('express');
const minionsRouter = express.Router();
const { getAllFromDatabase, getFromDatabaseById, deleteFromDatabasebyId, addToDatabase, updateInstanceInDatabase } = require('./db');
const workRouter = require('./work');

module.exports = minionsRouter;

minionsRouter.use('/:minionId/work', workRouter);

minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if(minion){
        req.minion = minion;
        next();
    } else {
        res.status(404).send('Minion not found.');
    }
});

minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
});

minionsRouter.post('/', (req, res, next) => {
    if (req.body.name && typeof req.body.salary === 'number') {
        const newMinion = addToDatabase('minions', req.body);
        res.status(201).send(newMinion);
    } else {
        res.status(400).send('New minion data is incorrect.')
    }
});

minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
});

minionsRouter.put('/:minionId', (req, res, next) => {
    const updatedMinion = updateInstanceInDatabase('minions', req.body);
    res.status(200).send(updatedMinion);
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    deleteFromDatabasebyId('minions', req.minion.id);
    res.status(204).send(`Minion ${req.minion} deleted.`);
});