var top_listModel = require('../models/top_listModel');
var express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');

exports.getList=(req, res, next)=>{    //top 종목 조회 (메인화면에서)
    var ID = req.session.ID;
    try{
        top_listModel.getList((data)=>{
            if(!data[0])
                return res.send("<script>alert('종목이 존재하지 않습니다.'); history.go(-1); </script>");

                //return res.json({ statusCode: CODE.FAIL, msg: "No data in DB" });

            //console.log('data : '+JSON.stringify(data));
            res.render('topstock',{rows: data, session : ID}); // -> ejs에서 fornt와 연결하는 방법
            //res.render('company',{rows: rows, session : ID});
            //res.render('main',{title: "Top 종목", session : session, data: data}); // -> ejs에서 fornt와 연결하는 방법
            //return res.json({ statusCode: CODE.SUCCESS, msg: "getList Success" });
        });
    }catch(err){
        console.log(err);
        next(err);
        return res.send("<script>alert('DB 연결 오류'); history.go(-1); </script>");
        //return res.json({ statusCode: CODE.DB_CONNECTION_ERROR, msg: "DB connection error"});
    }
}