var express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');

/* 로그아웃 GET */
exports.getLogout=async function(req, res, next){
    var session = req.session;
    var ID = req.session.ID;
    try{
        if (session.ID) {
            req.session = null;  //세션 삭제
            res.clearCookie('sid');
            return res.send("<script>alert('로그아웃 완료되었습니다.'); window.location.replace('/board'); </script>");
            //return res.json({ statusCode: CODE.SUCCESS, msg: "로그아웃 되었습니다."});
        }
    }
    catch (e) {
        console.log(e)
    }
    //res.redirect('/user/login');
}