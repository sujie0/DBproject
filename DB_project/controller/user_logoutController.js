var express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');

/* 로그아웃 GET */
exports.getLogout=async function(req, res, next){

    var session = req.session;
    try{
        if (session.ID) {
            req.session = null;  //세션 삭제
            res.clearCookie('sid');
            //res.redirect('/user/login');
            return res.json({ statusCode: CODE.SUCCESS, msg: "로그아웃 되었습니다."});
        }
    }
    catch (e) {
        console.log(e)
    }
    //res.redirect('/user/login');
}