const express = require('express');
const router = express.Router();
const userlistController = require('../controller/userlistController');
const usermanageController = require('../controller/usermanageController');

router.get('/userlist', userlistController.getList);

router.get('/read/:ID',usermanageController.readUser);
router.delete('/read/:ID',usermanageController.deleteUser);
router.post('/read/:ID',usermanageController.postData);

module.exports = router;
