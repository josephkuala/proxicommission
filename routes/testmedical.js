const express = require('express');
const router = express.Router();
const { createTestMed } = require('../controller/testMedical/createTestMed')
const { deleteTestMed } = require('../controller/testMedical/deleteTestMed')
const { findAllTestMed } = require('../controller/testMedical/findAllTestMed')
const { findTestMedById } = require('../controller/testMedical/findTestMedbyId')
const { updateTestMed } = require('../controller/testMedical/updateTestMed')

//Get all category
router.get('/testmedicals', findAllTestMed);

//Get category by Id
router.get('/testmedical/:id', findTestMedById);

//Post category
router.post('/createtest', createTestMed);

//Put category
router.put('/updatetest', updateTestMed);

//Delete category
router.delete('/deletetest/:id', deleteTestMed);


module.exports = router