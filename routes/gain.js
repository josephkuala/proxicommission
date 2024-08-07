const express = require('express');
const router = express.Router();
const { createGain } = require('../controller/gain/createGain');
const { findAllGain } = require('../controller/gain/findAllGain');
const { findGainById } = require('../controller/gain/findGainbyId');
const { findGainsByMedId } = require('../controller/gain/findGainsByMedId')


//Get all Gain
router.get('/gains', findAllGain);

//Get Gain by Id
router.get('/gainid/:id', findGainById);

//Get Gain by Id
router.get('/gainsmed/:medId', findGainsByMedId);

//Post Gain
router.post('/creategain', createGain);

module.exports = router