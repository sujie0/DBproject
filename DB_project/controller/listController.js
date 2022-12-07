const listModel = require('../models/listModel');
const express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');

exports.getList=(req, res, next)=>{
    var session = req.session.ID;

    try{
        listModel.getList((data)=>{
            if(!data[0])
                return res.send("<script>alert('게시물이 존재하지 않습니다.'); history.go(-1); </script>");

            console.log('data : '+JSON.stringify(data));
            res.render('list',{title: "종목토론게시판", session : session, data: data}); // -> ejs에서 fornt와 연결하는 방법
            //return res.json({ statusCode: CODE.SUCCESS, msg: "getList Success" });
        });
    }catch(err){
        console.log(err);
        next(err);
        return res.json({ statusCode: CODE.DB_CONNECTION_ERROR, msg: "DB connection error"});
    }
}