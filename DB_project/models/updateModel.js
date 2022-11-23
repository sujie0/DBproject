const express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');
const mysql      = require('mysql');
const dbconfig   = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);

exports.getData=(idx, callback)=>{
    var sql='SELECT * FROM 종목토론게시판 WHERE idx=?';
    connection.query(sql, idx, (err, row, fileds)=>{
        if(err) throw err;
        callback(row);
    });
}

exports.getComment=(idx, callback)=>{
    var sql = 'SELECT idx, ID, 댓글 FROM 종목토론게시판_댓글 WHERE 게시판idx=?';
    connection.query(sql, idx, (err, comments, fileds)=>{
        if(err) throw err;
        callback(comments);
    });
}


exports.updateData=(data, callback)=>{
    var sql='UPDATE 종목토론게시판 SET 글제목=?, 글내용=? WHERE idx=?';
    var sql2='UPDATE 종목토론게시판 SET 글제목=?, 글내용=? 이미지=? WHERE idx=?';
    
    if(data.length==3){ //이미지 파일 없는 경우
        connection.query(sql, data, (err, result, filed)=>{
            if(err) throw err;
            callback(result);
        });

    } else if(data.length==4){ //이미지 파일이 있는 경우
        connection.query(sql2, data, (err, result, fileds)=>{
            if(err) throw err;
            callback(result);
        });
    }
}
