const express = require('express');
const router = express.Router();
const { createPatient } = require('../controller/patient/createPatient')
const { deletePatient } = require('../controller/patient/deletePatient')
const { findAllPatient } = require('../controller/patient/findAllPatient')
const { findPatientById } = require('../controller/patient/findPatientbyId')
const { updatePatient } = require('../controller/patient/updatePatient')
const auth = require('../auth/auth')


//Get all category
router.get('/patients', findAllPatient);

//Get category by Id
router.get('/patient/:id', findPatientById);

//Post category
router.post('/createpat', createPatient);

//Put category
router.put('/updatepat/:id', updatePatient);

//Delete category
router.delete('/deletepat/:id', deletePatient);



module.exports = router