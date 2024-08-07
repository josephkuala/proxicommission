const express = require('express');
const router = express.Router();
const { createEtat } = require('../controller/etat/createEtat')


//Post category
router.post('/createtat', createEtat);

module.exports = router