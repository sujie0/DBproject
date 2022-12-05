const writeModel = require('../models/companywriteModel');
const express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');

exports.writeForm=(req,res)=>{
    var ID = req.session.ID;
    if(ID!="master")
    {
        return res.send("<script>alert('관리자만 접근 가능합니다.'); window.location.replace('/user/login'); </script>");
    }
    res.render('companyWrite',{title: "주식회사 등록"});
}


exports.writeData=(req, res, next)=>{
    var ID = req.session.ID;
    if(!ID)
        return res.json({statusCode : CODE.FAIL, msg : "로그인해주세요"});
    if(ID!="master")
        return res.json({statusCode : CODE.FAIL, msg : "관리자만 접근 가능합니다."});
        
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
                        //return res.json({ statusCode: CODE.SUCCESS, msg: "Sucess insert data" });
                        return res.send("<script>alert('회사 등록이 완료되었습니다.'); window.location.replace('/company'); </script>");
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