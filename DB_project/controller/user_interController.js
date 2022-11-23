var user_interModel = require('../models/user_interModel');
var express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');

exports.get관심List=(req, res, next)=>{    //이용자 관심종목 조회
    var ID = req.session.ID;
    
    try{
        user_interModel.get_interlist(ID, (rows)=>{
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