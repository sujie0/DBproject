const userlistModel = require('../models/userlistModel');
const express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');

exports.getList=(req, res, next)=>{
    var ID = req.session.ID;
    if(!ID)
        return res.send("<script>alert('관리자만 접근 가능합니다.'); window.location.replace('/user/login'); </script>");
        //return res.json({statusCode : CODE.FAIL, msg : "로그인해주세요"});
    if(ID!="master")
        return res.send("<script>alert('관리자만 접근 가능합니다.'); window.location.replace('/user/login'); </script>");
    //if(현재 사용자의 아이디==master) 
    //현재 사용자의 아이디가 관리자의 id인 경우에만 회원 목록 list 접근할  수 있도록 code 추가해야됨
    try{
        userlistModel.getList((data)=>{
            if(!data[0])
                return res.send("<script>alert('사용자가 존재하지 않습니다.'); window.location.replace('/board') </script>");

            //console.log('data : '+JSON.stringify(data));
            res.render('userList',{title: "이용자 목록", data: data, session : ID}); // -> ejs에서 fornt와 연결하는 방법
            //return res.json({ statusCode: CODE.SUCCESS, msg: "getList Success" });
        });
    }catch(err){
        console.log(err);
        next(err);
        return res.json({ statusCode: CODE.DB_CONNECTION_ERROR, msg: "DB connection error"});
    }
}