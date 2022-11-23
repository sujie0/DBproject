const writeModel = require('../models/writeModel');
const checkUserMode = require('../models/checkUserModel');
const express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');

exports.writeForm=(req,res)=>{
    res.render('write',{title: "게시판 글 쓰기"});
}

exports.writeData=(req, res, next)=>{
    var ID = req.session.ID;
    if(!ID)
        return res.json({statusCODE : CODE.FAIL, msg : "로그인 해주세요"});
    //var ID = req.body.ID; //추후에 로그인 된 상태 구현되면 그때 req.body.ID가 아닌 다른 걸로 수정해야됨
    try{
        checkUserMode.checkUser1(ID, (permit)=>{
            if(!permit[0].ID)
                return res.json({statusCODE : CODE.FAIL, msg : "로그인 해주세요"});
            else{
                var Title = req.body.Title;
                var Content = req.body.Content;
                if(!req.file) //file을 입력하지 않은 경우
                var data=[ID, Title, Content];
                else{ //file을 입력한 경우
                var Image='/images/'+req.file.filename;
                var data = [ID, Title, Content, Image];
                }

                for(var i=0;i<data.length;i++){
                if(!data[i])
                    return res.json({ statusCode: CODE.FAIL, msg: "모든 내용을 입력해주세요" });
                }

                try{
                    writeModel.insertData(data,()=>{
                        console.log("data : "+JSON.stringify(data));

                        res.redirect('/board');
            //return res.json({ statusCode: CODE.SUCCESS, msg: "Sucess insert data" });
            //redirect 어디로 할까? 게시판 목록 리스트로 할까 아니면 게시글 세부 정보 조회 페이지로 할까?
            //return res.redirect('/board');
                    });
                }catch(err){
                    console.log(err);
                    next(err);
                    return res.json({ statusCode: CODE.DB_CONNECTION_ERROR, msg: "DB connection error"});
                }
            }
        });
        
    }catch(err){
        console.log(err);
        next(err);
        return res.json({statusCode : CODE.DB_CONNECTION_ERROR, msg : "DB connection error"});
    }
    
}