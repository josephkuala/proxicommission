const express = require('express');
const router = express.Router();
const { createTransact } = require('../controller/transaction/createTransaction');
const { getCombinedData } = require('../controller/transaction/getAllTransactions');
const { getCombinedDataPage } = require('../controller/transaction/getAllTransactionsPage');
const { getDepotDataPage } = require('../controller/transaction/depotPage');
const { getRetraitDataPage } = require('../controller/transaction/retraitPage');
const { getRetraitData } = require('../controller/transaction/retrait')
const { getDepotData } = require('../controller/transaction/depot')

//Get Combine Transaction
router.get('/getcombine', getCombinedData);

//Get Combine Transaction Page
router.get('/getcombinepage/:page/:limit', getCombinedDataPage);
//Get Combine Transaction Page
router.get('/getcombinepaged/:page/:limit', getDepotDataPage);
//Get Combine Transaction Page
router.get('/getcombinepager/:page/:limit', getRetraitDataPage);

//Get Combine Transaction
router.get('/getretrait', getRetraitData);

//Get Combine Transaction
router.get('/getdepot', getDepotData);

//Post category
router.post('/createtransact', createTransact);

module.exports = router