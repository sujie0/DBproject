const listModel = require('../models/listModel');
const express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');

exports.getList=(req, res, next)=>{
    
    try{
        listModel.getList((data)=>{
            if(!data[0])
                return res.json({ statusCode: CODE.FAIL, msg: "No data in DB" });

            console.log('data : '+JSON.stringify(data));
            res.render('list',{title: "종목토론게시판", data: data}); // -> ejs에서 fornt와 연결하는 방법
            //return res.json({ statusCode: CODE.SUCCESS, msg: "getList Success" });
        });
    }catch(err){
        console.log(err);
        next(err);
        return res.json({ statusCode: CODE.DB_CONNECTION_ERROR, msg: "DB connection error"});
    }
}