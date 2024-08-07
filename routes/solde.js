const express = require('express');
const router = express.Router();
const { createSolde } = require('../controller/solde/createSolde')
const { deleteSolde } = require('../controller/solde/deleteSolde')
const { findAllSolde } = require('../controller/solde/findAllSolde')
const { findSoldeById } = require('../controller/solde/findSoldebyId')
const { updateSolde } = require('../controller/solde/updateSolde')


//Get all category
router.get('/soldes', findAllSolde);

//Get category by Id
router.get('/solde/:id', findSoldeById);

//Post category
router.post('/createsolde', createSolde);

//Put category
router.put('/updatesolde/:id', updateSolde);

//Delete category
router.delete('/deletesolde/:id', deleteSolde);



module.exports = router