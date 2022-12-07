var com_readModel = require('../models/com_readModel');
var express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');
const url = require('url');

exports.readData=(req, res, next)=>{    //주식회사 정보 목록 조회
    var queryData=url.parse(req.url,true).query;
    var idx=queryData.idx;
    var ID = req.session.ID;
    try{
        com_readModel.getData(idx, (rows)=>{
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
