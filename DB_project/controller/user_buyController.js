var user_buyModel = require('../models/user_buyModel');
var express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');

exports.buyStock=(req, res, next)=>{    //주식매수
    var ID = req.session.ID;

    var TIME_ZONE = 3240 * 10000;
    var today = new Date();
    var date = new Date(+today + TIME_ZONE).toISOString().split('T')[0];

    var datas = {
        "ID":ID,
        "종목코드": req.body.종목코드,
        "매수주식수": req.body.매수주식수,
        "매수가": req.body.매수가,
        "매수일": date
    }
    
    user_buyModel.insertData(datas, (rows)=>{
        console.log('data : '+JSON.stringify(rows));
        return res.json({ statusCode: CODE.SUCCESS, datas});
    });
}