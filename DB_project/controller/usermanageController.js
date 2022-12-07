const usermanageModel = require('../models/usermanageModel');
const express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');
const url = require('url');

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

            try{
                usermanageModel.getContent(ID, (Content)=>{
                    res.render('userRead',{data: data[0], Content : Content, session : ID_master});
                });
            }catch(err){
                console.log(err);
                next(err);
                return res.json({ statusCode: CODE.DB_CONNECTION_ERROR, msg: "DB connection error"});
            }
            
            //return res.json({ statusCode: CODE.SUCCESS, msg: "Sucess read data" });
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
            
            
        var queryData=url.parse(req.url,true).query;
    var ID=queryData.ID;
        var Grade = req.body.Grade;
        var data = [Grade, ID];

        console.log("data : "+JSON.stringify(data));

        try{
            usermanageModel.postData(data, (row)=>{
                if(!row.affectedRows)
                    return res.send("<script>alert('존재하지 않는 회원입니다.'); window.location.replace('/manager/userlist'); </script>");
                console.log("row : "+JSON.stringify(row));
                return res.send("<script>alert('변경되었습니다.'); window.location.replace('/manager/userlist'); </script>");
                //return res.json({ statusCode : CODE.SUCCESS, msg : "회원 등급 조정 성공"});
            });
        }catch(err){
            console.log(err);
            return res.json({ statusCode : CODE.DB_CONNECTION_ERROR, msg : "DB connection error"});
        }
    }
}