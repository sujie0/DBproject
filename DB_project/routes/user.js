var express = require('express');
var router = express.Router();

var user_regController = require('../controller/user_regController');         //회원가입
var user_logController = require('../controller/user_logController');         //로그인
var user_logoutController = require('../controller/user_logoutController');   //로그아웃
var user_ownController = require('../controller/user_ownController');         //이용자 보유주식 조회
var user_interController = require('../controller/user_interController');     //이용자 관심종목 조회
var user_buyController = require('../controller/user_buyController');         //이용자 주식매수
var user_sellController = require('../controller/user_sellController');       //이용자 주식매도

//router.get('/register', user_regController.getData);      //회원가입 화면
router.post('/register', user_regController.registerData);                 

router.get('/login', user_logController.getLogin);          //로그인 화면
router.post('/login', user_logController.postLogin);
router.get('/logout', user_logoutController.getLogout);     //로그아웃                      

router.get('/own', user_ownController.get보유List);           //보유주식 조회
router.get('/interest', user_interController.get관심List);    //관심종목 조회

//주식매매: 버튼 클릭
router.post('/buy', user_buyController.buyStock);         //주식매수         
router.post('/sell', user_sellController.sellStock);      //주식매도

module.exports = router; 