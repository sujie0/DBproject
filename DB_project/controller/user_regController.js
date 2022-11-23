var user_regModel = require('../models/user_regModel');
var express = require('express');
const crypto = require('crypto');
const { json } = require('express');
const CODE = require('../modules/statusCode');

/*exports.getLogin=(req, res, next)=>{ //회원가입 화면
    //res.render("user/register");
}*/

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
        return res.json({ statusCode: CODE.SUCCESS, datas});
    });

    //salt: 비밀번호를 암호화할 때 추가로 salt를 적용하여 보완성을 더 높여야 암호화가 잘 되었다고 할
}