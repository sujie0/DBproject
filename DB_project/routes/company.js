const express = require('express');
const router = express.Router();
const companywriteController = require('../controller/companywriteController');
const companyupdateController = require('../controller/companyupdateController');

router.post('/write', companywriteController.writeData);
router.get('/update',companyupdateController.updateForm);
router.post('/update',companyupdateController.updateData);


module.exports = router;
