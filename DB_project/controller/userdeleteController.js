const usermanageModel = require('../models/usermanageModel');
const express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');
const url = require('url');

module.exports={
    deleteUser : function(req, res, next){
        var ID_master = req.session.ID;
        if(!ID_master)
            return res.json({statusCode : CODE.FAIL, msg : "로그인해주세요"});
        if(ID_master!="master")
            return res.json({statusCode : CODE.FAIL, msg : "관리자만 접근 가능합니다."});

        var queryData=url.parse(req.url,true).query;
        var ID=queryData.ID;

        try{
            usermanageModel.deleteData(ID, (data)=>{
                if(!data.affectedRows)
                    return res.json({ statusCode : CODE.FAIL, msg : "존재하지 않는 회원입니다."});
                console.log("data : "+JSON.stringify(data));
                res.redirect('/manager/userlist');
                //return res.json({ statusCode : CODE.SUCCESS, msg : "Success delete user"});
            });
        }catch(err){
            console.log(err);
            next(err);
            return res.json({ statusCode : CODE.DB_CONNECTION_ERROR, msg: "DB connection error"});
        }
    }
}