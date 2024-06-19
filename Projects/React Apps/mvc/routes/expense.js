// require express and it's router component
const express = require('express');
const { create, expenseById, read, update, remove, expenseByDate } = require('../controllers');

const router = express.Router();

// require the middlewares and callback functions from the controller directory

// Create POST route to create an expense
router.post('/expense/create', create);

// Create GET route to read an expense
router.get('/expense/:id', expenseById, read);

// Create PUT route to update an expense
router.put('/expense/:id', expenseById, update);

// Create DELETE route to remove an expense
router.delete('/expense/:id', expenseById, remove);

// Create GET route to read a list of expenses
router.get('/expense', expenseByDate, read);

module.exports = router;
