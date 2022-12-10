const listModel = require('../models/listModel');
const express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');

exports.getList=(req, res, next)=>{
    var session = req.session.ID;
    var no_data=0;

    try{
        listModel.getList((data)=>{
            if(!data[0])
                no_data=1;

            console.log('data : '+JSON.stringify(data));
            res.render('list',{title: "종목토론게시판", session : session, data: data, no_data : no_data}); // -> ejs에서 fornt와 연결하는 방법
            //return res.json({ statusCode: CODE.SUCCESS, msg: "getList Success" });
        });
    }catch(err){
        console.log(err);
        next(err);
        return res.json({ statusCode: CODE.DB_CONNECTION_ERROR, msg: "DB connection error"});
    }
}