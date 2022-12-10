var user_regModel = require('../models/user_regModel');
var express = require('express');
const crypto = require('crypto');
const { json } = require('express');
const CODE = require('../modules/statusCode');

/*exports.getLogin=(req, res, next)=>{ //회원가입 화면
    //res.render("user/register");
}*/

/* 로그인 GET */
exports.getRegister=(req, res, next)=>{  //로그인 화면
    var ID = req.session.ID;
    res.render('register', {session : ID}); // -> ejs에서 fornt와 연결하는 방법
    /*res.render("user/login", {
        session : session
    });*/
}


exports.registerData=async function(req, res, next){    //이용자 회원가입
    var body = req.body;

    var inputPW = body.PW;
    var salt = Math.round((new Date().valueOf() * Math.random())) + "";
    var hashPW = crypto.createHash("sha512").update(inputPW + salt).digest("hex");
    var datas = {
        "ID": body.ID,
        "PW": hashPW,
        "사용자명": body.사용자명,
        "이메일": body.이메일,
        "닉네임": body.닉네임,
        "salt": salt
    }
    user_regModel.insertData(datas, (rows)=>{
        console.log('data : '+JSON.stringify(rows));
        return res.send("<script>alert('회원가입 완료되었습니다!'); window.location.replace('/user/login'); </script>");
        //return res.json({ statusCode: CODE.SUCCESS, datas});
    });

    //salt: 비밀번호를 암호화할 때 추가로 salt를 적용하여 보완성을 더 높여야 암호화가 잘 되었다고 할
}