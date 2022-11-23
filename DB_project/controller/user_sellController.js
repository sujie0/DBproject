var user_sellModel = require('../models/user_sellModel');
var express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');

exports.sellStock=(req, res, next)=>{    //주식매도
    var ID = req.session.ID;

    var TIME_ZONE = 3240 * 10000;
    var today = new Date();
    var date = new Date(+today + TIME_ZONE).toISOString().split('T')[0];
    
    var datas = {
        "종목코드": req.body.종목코드,
        "매도주식수": req.body.매도주식수,
        "매도가": req.body.매도가,
        "매도일": date
    }
    
    user_sellModel.deleteData(datas, ID, (rows)=>{
        console.log('data : '+JSON.stringify(rows));
        return res.json({ statusCode: CODE.SUCCESS, datas});
    });
}