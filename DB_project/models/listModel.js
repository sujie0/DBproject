const express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');
const mysql      = require('mysql');
const dbconfig   = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);

module.exports={getList(callback){
    var sql='SELECT idx, 닉네임, 글제목 FROM 종목토론게시판 NATURAL JOIN 사용자 ORDER BY idx';
        
    connection.query(sql, (err, data, fileds)=>{
        if(err) throw err;

        callback(data);
    });
}}