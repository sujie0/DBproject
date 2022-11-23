var user_ownModel = require('../models/user_ownModel');
var express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');

exports.get보유List=(req, res, next)=>{    //이용자 보유주식 조회
    var ID = req.session.ID;
    try{
        user_ownModel.get_ownlist(ID, (rows)=>{
            if(!rows[0])
                return res.json({ statusCode: CODE.FAIL, msg: "No data in DB" });

            console.log('data : '+JSON.stringify(rows));
            return res.json({ statusCode: CODE.SUCCESS, msg: "getList Success"});
        });
    }catch(err){
        console.log(err);
        next(err);
        return res.json({ statusCode: CODE.DB_CONNECTION_ERROR, msg: "DB connection error"});
    }
}