const express = require('express');
const router = express.Router();
const companygetlistController = require('../controller/com_listController');
const companyreadController = require('../controller/com_readController');
const companywriteController = require('../controller/companywriteController');
const companyupdateController = require('../controller/companyupdateController');

router.get('/',companygetlistController.getList);
router.get('/read',companyreadController.readData);
router.get('/write',companywriteController.writeForm);
router.post('/write', companywriteController.writeData);
router.get('/update',companyupdateController.updateForm);
router.post('/update',companyupdateController.updateData);


module.exports = router;
