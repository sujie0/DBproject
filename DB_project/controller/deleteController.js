const deleteModel = require('../models/deleteModel');
const checkUserMode = require('../models/checkUserModel');
const express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');
const url = require('url');

exports.deleteData=(req, res, next)=>{
        //var idx = req.params.idx;
        var queryData=url.parse(req.url,true).query;
        var idx=queryData.idx;

        var ID = req.session.ID;
        console.log("ID : ",ID);
        try{
            checkUserMode.checkUser(ID, (permit)=>{
                console.log("permit : ",permit.affectedRows);
            });
        }catch(err){
            console.log(err);
            next(err);
            return res.json({statusCode : CODE.DB_CONNECTION_ERROR, msg : "DB connection error"});
        }
        

        console.log("idx : ",idx);
        try{
            deleteModel.deleteComment(idx, (result)=>{
                try{
                    deleteModel.deleteData(idx, (data)=>{
                        if(!data.affectedRows)
                            return res.json({ statusCode : CODE.FAIL, msg : "존재하지 않는 게시물입니다."});
                        console.log("data : "+JSON.stringify(data));

                        //res.redirect('/board');
                        return res.json({ statusCode : CODE.SUCCESS, msg : "Success delete board"});
                    });
                }catch(err){
                    console.log(err);
                    next(err);
                    return res.json({ statusCode : CODE.DB_CONNECTION_ERROR, mesg: "DB connection error"});
                }
            });
        }catch(err){
            console.log(err);
            next(err);
            return res.json({ statusCode : CODE.DB_CONNECTION_ERROR, mesg: "DB connection error"});
        }
}
