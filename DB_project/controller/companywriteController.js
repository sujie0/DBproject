const writeModel = require('../models/companywriteModel');
const express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');

exports.writeData=(req, res, next)=>{
    var Code = req.body.Code;
    var Name = req.body.Name;
    var Number = req.body.Number;
    var Info = req.body.Info;
    var data=[Code, Name, Number, Info];
    
    for(var i=0;i<data.length;i++){
        if(!data[i])
            return res.json({ statusCode: CODE.FAIL, msg: "모든 내용을 입력해주세요" });
    }

    //해당 회사가 이미 등록되어 있는지 먼저 check
    try{
        writeModel.checkCode(Code, (permit)=>{
            console.log("permit : "+JSON.stringify(permit));
            if(!permit[0]) //해당 회사가 등록되어 있지 않은 경우
            {
                try{
                    writeModel.insertData(data,()=>{
                        console.log("data : "+JSON.stringify(data));
                        return res.json({ statusCode: CODE.SUCCESS, msg: "Sucess insert data" });
                        //redirect 어디로 할까?
                        //return res.redirect('/company');
                    });
                }catch(err){
                    console.log(err);
                    next(err);
                    return res.json({ statusCode: CODE.DB_CONNECTION_ERROR, msg: "DB connection error"});
                }
            }
            else
                return res.json({ statusCode: CODE.FAIL, msg: "해당 회사가 이미 존재합니다."});
        });
    }catch(err){
        console.log(err);
        next(err);
        return res.json({ statusCode: CODE.DB_CONNECTION_ERROR, msg: "DB connection error"});
    }

    
}