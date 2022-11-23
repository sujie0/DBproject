const express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');
const mysql      = require('mysql');
const dbconfig   = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);

module.exports={insertData(data, callback){
    var sql='INSERT INTO 종목토론게시판(ID, 글제목, 글내용, 이미지) VALUES(?, ?, ?, ?)';
    var sql2='INSERT INTO 종목토론게시판(ID, 글제목, 글내용) VALUES(?, ?, ?)';
    
    if(data.length==3){ //이미지 파일이 없는 경우
        connection.query(sql2, data, function(err, rows, fileds){
            if(err) throw err;
            
            callback();
        });
    }
    else if(data.length==4){ //이미지 파일이 있는 경우
        connection.query(sql, data, function(err, rows, fileds){
            if(err) throw err;
        
            callback();
        });
    }
}}