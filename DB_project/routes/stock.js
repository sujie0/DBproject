var express = require('express');
var router = express.Router();

var stock_readController = require('../controller/stock_readController');  //종목시세 세부정보 조회 (종목시세 화면)
var top_listController = require('../controller/top_listController');      //top 종목 리스트 조회 (메인화면)

router.get('/read/:code', stock_readController.readData);
router.get('/top', top_listController.getList); 

module.exports = router;