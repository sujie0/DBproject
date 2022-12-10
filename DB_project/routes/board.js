const express = require('express');
const router = express.Router();
const multer=require('multer');
const { write, read } = require('fs');
var path=require('path');
const listController = require('../controller/listController');
const writeController = require('../controller/writeController');
const readController = require('../controller/readController');
const updateController = require('../controller/updateController');
const deleteController = require('../controller/deleteController');



var storage=multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/images/");
    },
    filename: function(req, file, cb){
        var ext=path.extname(file.originalname);
        cb(null, path.basename(file.originalname, ext)+"-"+Date.now()+ext);
    },
});

var upload=multer({storage: storage});


router.get('/', listController.getList);

router.get('/write',writeController.writeForm);
router.post('/write',upload.single("Image"),writeController.writeData);

router.get('/read/:idx',readController.readData);

router.get('/update',updateController.updateForm);
router.post('/update',upload.single("Image"), updateController.updateData);

//router.post('/read/:idx',readController.deleteData);

router.get('/delete',deleteController.deleteData);

router.post('/read/:board_idx',readController.postComment);


module.exports = router;
