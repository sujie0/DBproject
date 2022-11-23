var com_readModel = require('../models/com_readModel');
var express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');

exports.readData=(req, res, next)=>{    //주식회사 정보 목록 조회
    var idx = req.params.idx;
    try{
        com_readModel.getData(idx, (rows)=>{
            if(!rows[0])
                return res.json({ statusCode: CODE.FAIL, msg: "No data in DB" });

            console.log('data : '+JSON.stringify(rows));
            return res.json({ statusCode: CODE.SUCCESS, msg: "getList Success" });
        });
    }catch(err){
        console.log(err);
        next(err);
        return res.json({ statusCode: CODE.DB_CONNECTION_ERROR, msg: "DB connection error"});
    }
}
