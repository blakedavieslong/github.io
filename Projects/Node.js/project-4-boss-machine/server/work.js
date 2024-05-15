const express = require('express');
const workRouter = express.Router({mergeParams: true});
const { getAllFromDatabase, getFromDatabaseById, deleteFromDatabasebyId, addToDatabase, updateInstanceInDatabase, getAllWorkForMinionFromDatabase } = require('./db');

module.exports = workRouter;

workRouter.param('workId', (req, res, next, id) => {
    const work = getFromDatabaseById('work', id);
    if(work){
        req.work = work;
        next();
    } else {
        res.status(404).send('Work not found.');
    }
});

workRouter.get('/', (req, res, next) => {
    res.send(getAllWorkForMinionFromDatabase(req.minion.id));
});

workRouter.post('/', (req, res, next) => {
    if (typeof req.body.hours === 'number' && req.body.hours > 0 && req.minion.id === req.body.minionId) {
        const newWork = addToDatabase('work', req.body);
        res.status(201).send(newWork);
    } else {
        res.status(400).send('New work data is invalid.')
    }
});

workRouter.put('/:workId', (req, res, next) => {
    if(req.minion.id !== req.body.minionId) {
        res.status(400).send('WorkId does not match its minionId.')
    } else {
        const updatedWork = updateInstanceInDatabase('work', req.body);
        res.status(200).send(updatedWork);
    }
});

workRouter.delete('/:workId', (req, res, next) => {
    deleteFromDatabasebyId('work', req.work.id);
    res.status(204).send(`Work ${req.work} deleted.`);
});