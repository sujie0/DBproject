var com_readModel = require('../models/com_readModel');
var user_buyModel = require('../models/user_buyModel');
var express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');
const url = require('url');

exports.readData=(req, res, next)=>{    //주식회사 정보 목록 조회
    var queryData=url.parse(req.url,true).query;
    var code=queryData.code;
    var ID = req.session.ID;
    try{
        com_readModel.getData(code, (rows)=>{
            if(!rows[0])
                return res.send("<script>alert('주식회사 정보가 존재하지 않습니다.'); history.go(-1); </script>");

            console.log('data : '+JSON.stringify(rows));
            res.render('company_read', {rows: rows[0], session : ID}); // -> ejs에서 fornt와 연결하는 방법
            //return res.json({ statusCode: CODE.SUCCESS, msg: "getList Success" });
        });
    }catch(err){
        console.log(err);
        next(err);
            return res.send("<script>alert('DB 연결 오류'); history.go(-1); </script>");
        //return res.json({ statusCode: CODE.DB_CONNECTION_ERROR, msg: "DB connection error"});
    }
}

exports.buyPrice=(req, res, next)=>{
    var ID = req.session.ID;
    var queryData=url.parse(req.url,true).query;
    var code=queryData.code;

    if(!ID)
        return res.send("<script>alert('로그인 후 이용 가능한 서비스입니다.'); window.location.replace('/user/login'); </script>");
    
    var TIME_ZONE = 3240 * 10000;
    var today = new Date();
    var date = new Date(+today + TIME_ZONE).toISOString().split('T')[0];

    user_buyModel.getPrice(code, (Price)=>{
        if(!Price[0])
            return res.send("<script>alert('해당 종목의 시세 정보가 없습니다.'); history.go(-1); </script>");
        
        var price=Price[0].시가;
        console.log('price : ',price);

        var datas = {
            "ID":ID,
            "종목코드": code,
            "매수주식수": req.body.Number,
            "매수가": price,
            "매수일": date
        }

        user_buyModel.insertData(datas, ()=>{
            return res.send("<script>alert('주식 구매가 완료되었습니다.'); window.location.replace('/user/own'); </script>");
            //return res.json({ statusCode: CODE.SUCCESS, datas});
        });
    });
}