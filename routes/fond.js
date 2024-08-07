const express = require('express');
const router = express.Router();
const { createHistory } = require('../controller/fonds/createHistoryFond')


//Post category
router.post('/creathistory', createHistory);

module.exports = router