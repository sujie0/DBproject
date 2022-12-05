const express = require('express');
const router = express.Router();
const userlistController = require('../controller/userlistController');
const usermanageController = require('../controller/usermanageController');
const userdeleteController = require('../controller/userdeleteController');

router.get('/userlist', userlistController.getList);



router.get('/delete',userdeleteController.deleteUser);

//router.delete('/read/:ID',usermanageController.deleteUser);
router.get('/read/:ID',usermanageController.readUser);
router.post('/read/:ID',usermanageController.postData);

router.post('/update',usermanageController.postData);

module.exports = router;
