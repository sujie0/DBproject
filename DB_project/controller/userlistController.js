const userlistModel = require('../models/userlistModel');
const express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');

exports.getList=(req, res, next)=>{
    //if(현재 사용자의 아이디==master) 
    //현재 사용자의 아이디가 관리자의 id인 경우에만 회원 목록 list 접근할  수 있도록 code 추가해야됨
    try{
        userlistModel.getList((data)=>{
            if(!data[0])
                return res.json({ statusCode: CODE.FAIL, msg: "User is not exists" });

            console.log('data : '+JSON.stringify(data));
            return res.json({ statusCode: CODE.SUCCESS, msg: "getList Success" });
        });
    }catch(err){
        console.log(err);
        next(err);
        return res.json({ statusCode: CODE.DB_CONNECTION_ERROR, msg: "DB connection error"});
    }
}