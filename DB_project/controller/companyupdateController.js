const updateModel = require('../models/companyupdateModel');
const express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');
var url = require('url');

exports.updateForm=(req, res, next)=>{
    var ID = req.session.ID;
    if(!ID)
        return res.json({statusCode : CODE.FAIL, msg : "로그인해주세요"});
    if(ID!="master")
        return res.json({statusCode : CODE.FAIL, msg : "관리자만 접근 가능합니다."});

    var queryData=url.parse(req.url,true).query;
    var Code=queryData.Code;
    updateModel.getData(Code, (row)=>{
        try{
            if(!row[0])
                return res.json({ statusCode : CODE.FAIL, msg: "해당 회사가 존재하지 않습니다."});
            console.log("update에서 1개 글 조회 결과 확인 : ",row);
            res.render('companyUpdate',{row: row[0]});
            //return res.json({ statusCode: CODE.SUCCESS, msg: "Success"});
        }catch(error){
            console.log(err);
            next(err);
            return res.json({ statusCode: CODE.DB_CONNECTION_ERROR, msg: "DB connection error"});
        }
    });
}


exports.updateData=(req, res, next)=>{
    var ID = req.session.ID;
    if(!ID)
        return res.json({statusCode : CODE.FAIL, msg : "로그인해주세요"});
    if(ID!="master")
        return res.json({statusCode : CODE.FAIL, msg : "관리자만 접근 가능합니다."});
        
    var Code = req.body.Code[0];
    var Name = req.body.Name;
    var Number = req.body.Number;
    var Info = req.body.Info;
    var data=[Code, Name, Number, Info, Code];
    console.log("result : "+JSON.stringify(data));
    
    for(var i=0;i<data.length;i++){
        if(!data[i])
            return res.json({ statusCode: CODE.FAIL, msg: "모든 내용을 입력해주세요" });
    }

    try{
        updateModel.Update(data,(result)=>{
            if(!result.affectedRows)
                return res.json({ statusCode: CODE.FAIL, msg: "잘못된 요청으로 변경되지 않았습니다."});
            //console.log("result : "+JSON.stringify(result));
            //return res.json({ statusCode: CODE.SUCCESS, msg: "Sucess update data" });
            return res.send("<script>alert('수정 완료되었습니다.'); window.location.replace('/company'); </script>");
        });
    }catch(err){
        console.log(err);
        next(err);
        return res.json({ statusCode: CODE.DB_CONNECTION_ERROR, msg: "DB connection error"});
    }
}