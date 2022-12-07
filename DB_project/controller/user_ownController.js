var user_ownModel = require('../models/user_ownModel');
var express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');

exports.get보유List=(req, res, next)=>{    //이용자 보유주식 조회
    var ID = req.session.ID;
    if(!ID)
    {
        return res.send("<script>alert('로그인이 필요한 서비스입니다.'); window.location.replace('/user/login'); </script>");
    }
    try{
        user_ownModel.get_ownlist(ID, (rows)=>{
            if(!rows[0])
                return res.send("<script>alert('보유 주식이 없습니다.'); window.location.replace('/board'); </script>");
                //return res.json({ statusCode: CODE.FAIL, msg: "No data in DB" });

            console.log('data : '+JSON.stringify(rows));
            res.render('own', {rows: rows, session : ID});
            //return res.json({ statusCode: CODE.SUCCESS, msg: "getList Success"});
        });
    }catch(err){
        console.log(err);
        next(err);
        return res.json({ statusCode: CODE.DB_CONNECTION_ERROR, msg: "DB connection error"});
    }
}