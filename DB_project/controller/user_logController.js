var user_logModel = require('../models/user_logModel');
var express = require('express');
const crypto = require('crypto');
const { json } = require('express');
const CODE = require('../modules/statusCode');

/* 로그인 GET */
exports.getLogin=(req, res, next)=>{  //로그인 화면
    var session = req.session;
    /*res.render("user/login", {
        session : session
    });*/
}

/* 로그인 POST */
exports.postLogin=async function(req, res, next){    //이용자 회원가입
  
    var body = req.body;
    user_logModel.getData(body, (rows)=>{

        var dbPW = rows[0].PW;
        var inputPW = body.PW;
        var salt = rows[0].salt;
        var hashPW = crypto.createHash("sha512").update(inputPW + salt).digest("hex");

        if(dbPW === hashPW){
            console.log("비밀번호 일치");
            //세션 설정
            req.session.ID = body.ID;
            req.session.is_logined = true;

            console.log('data : '+JSON.stringify(rows));
            return res.json({ statusCode: CODE.SUCCESS, body});
        }else{
            console.log("비밀번호 불일치");
            return res.json({ statusCode: CODE.FAIL, msg: "비밀번호 불일치"})
        }
        //res.redirect("/user/login");
    
    });
}