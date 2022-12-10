var stock_readModel = require('../models/stock_readModel');
var express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');

exports.readData=(req, res, next)=>{    //종목시세 세부정보 조회
    var code = req.params.code;
    var session = req.session.ID;
    var no_data=0;
    try{
        stock_readModel.getData(code, (data)=>{
            if(!data[0])
                return res.send("<script>alert('시세 정보가 존재하지 않습니다.'); history.go(-1); </script>");

            //console.log('data : '+JSON.stringify(data));
            res.render('price',{title: "Top 종목", data: data, session : session, no_data : no_data});
            //return res.json({ statusCode: CODE.SUCCESS, msg: "getList Success" });
        });
    }catch(err){
        console.log(err);
        next(err);
        return res.json({ statusCode: CODE.DB_CONNECTION_ERROR, msg: "DB connection error"});
    }
}