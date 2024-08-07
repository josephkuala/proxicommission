const express = require('express');
const router = express.Router();
const { createTypeUser } = require('../controller/typeuser/createTypeUser');
const { findAllTypeUser } = require('../controller/typeuser/findAllType')


//Find type user
router.get('/findall', findAllTypeUser);

//Post type user
router.post('/create', createTypeUser);

module.exports = router