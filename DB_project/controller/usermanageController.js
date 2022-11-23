const usermanageModel = require('../models/usermanageModel');
const express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');

module.exports={
    readUser : function(req, res, next){
        var ID_master = req.session.ID;
        if(!ID_master)
            return res.json({statusCode : CODE.FAIL, msg : "로그인해주세요"});
        if(ID_master!="master")
            return res.json({statusCode : CODE.FAIL, msg : "관리자만 접근 가능합니다."});

        var ID = req.params.ID;
        try{
        usermanageModel.getData(ID, (data)=>{
            if(!data[0])
                return res.json({ statusCode: CODE.FAIL, msg: "존재하지 않는 회원입니다." });
            console.log("data : "+JSON.stringify(data));
            return res.json({ statusCode: CODE.SUCCESS, msg: "Sucess read data" });
        });
        }catch(err){
            console.log(err);
            next(err);
            return res.json({ statusCode: CODE.DB_CONNECTION_ERROR, msg: "DB connection error"});
        }
    },

    deleteUser : function(req, res, next){
        var ID_master = req.session.ID;
        if(!ID_master)
            return res.json({statusCode : CODE.FAIL, msg : "로그인해주세요"});
        if(ID_master!="master")
            return res.json({statusCode : CODE.FAIL, msg : "관리자만 접근 가능합니다."});

        var ID = req.params.ID;
        try{
            usermanageModel.deleteData(ID, (data)=>{
                if(!data.affectedRows)
                    return res.json({ statusCode : CODE.FAIL, msg : "존재하지 않는 회원입니다."});
                console.log("data : "+JSON.stringify(data));
                return res.json({ statusCode : CODE.SUCCESS, msg : "Success delete user"});
            });
        }catch(err){
            console.log(err);
            next(err);
            return res.json({ statusCode : CODE.DB_CONNECTION_ERROR, msg: "DB connection error"});
        }
    },

    postData : function(req, res, next){
        var ID_master = req.session.ID;
        if(!ID_master)
            return res.json({statusCode : CODE.FAIL, msg : "로그인해주세요"});
        if(ID_master!="master")
            return res.json({statusCode : CODE.FAIL, msg : "관리자만 접근 가능합니다."});
            
        var ID = req.params.ID;
        var Grade = req.body.Grade;
        var data = [Grade, ID];

        try{
            usermanageModel.postData(data, (row)=>{
                if(!row.affectedRows)
                    return res.json({ statusCode : CODE.FAIL, msg : "존재하지 않는 회원입니다."});
                console.log("row : "+JSON.stringify(row));
                return res.json({ statusCode : CODE.SUCCESS, msg : "회원 등급 조정 성공"});
            });
        }catch(err){
            console.log(err);
            return res.json({ statusCode : CODE.DB_CONNECTION_ERROR, msg : "DB connection error"});
        }
    }
}