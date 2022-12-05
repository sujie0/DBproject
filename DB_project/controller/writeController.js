const writeModel = require('../models/writeModel');
const checkUserMode = require('../models/checkUserModel');
const express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');

exports.writeForm=(req,res)=>{
    var ID = req.session.ID;
    if(!ID)
    {
        return res.send("<script>alert('로그인이 필요한 서비스입니다.'); window.location.replace('/user/login'); </script>");
    }
    res.render('write',{title: "게시판 글 쓰기"});
}

exports.writeData=(req, res, next)=>{
    //var ID = req.body.ID;
    var ID = req.session.ID;
    if(!ID)
    {
        res.write("<script>alert('success')</script>");
        res.write("<script>window.location=\"/user/login\"</script>");
        //return res.json({statusCODE : CODE.FAIL, msg : "로그인 해주세요"});
    }
    
    try{
        checkUserMode.checkUser1(ID, (permit)=>{
            if(!permit[0].ID)
            {
                res.write("<script>alert('success')</script>");
                res.write("<script>window.location=\"/user/login\"</script>");
                //return res.json({statusCODE : CODE.FAIL, msg : "로그인 해주세요"});
            }
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