const express = require('express');
const { create, read, removeTodo} = require('../controller');

const router = new express.Router();

router.post('/todo/create', create);

router.get('/todo', read);

router.delete('/todo/:id', removeTodo);

module.exports = router;