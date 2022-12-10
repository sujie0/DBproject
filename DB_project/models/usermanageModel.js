const express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');
const mysql      = require('mysql');
const dbconfig   = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);

exports.getData=(ID, callback)=>{
    //var sql = 'SELECT ID, 사용자명, 닉네임, 이메일, 회원등급, 글제목, 글내용, 이미지, 신고횟수, 종목코드, 주식수, 매도가, 매도일 FROM 사용자 NATURAL JOIN 종목토론게시판 NATURAL JOIN 보유주식 WHERE ID=?';
    var sql = 'SELECT ID, 사용자명, 이메일, 닉네임, 회원등급 FROM 사용자 WHERE ID=?';
    connection.query(sql, ID, (err, data, fileds)=>{
        if(err) throw err;
        callback(data);
    });
}

exports.getContent=(ID, callback)=>{
    //var sql = 'SELECT ID, 사용자명, 닉네임, 이메일, 회원등급, 글제목, 글내용, 이미지, 신고횟수, 종목코드, 주식수, 매도가, 매도일 FROM 사용자 NATURAL JOIN 종목토론게시판 NATURAL JOIN 보유주식 WHERE ID=?';
    var sql = 'SELECT idx, 글제목, 글내용 FROM 종목토론게시판 WHERE ID=?';
    connection.query(sql, ID, (err, Content, fileds)=>{
        if(err) throw err;
        callback(Content);
    });
}

exports.deleteData=(ID, callback)=>{
    var sql = 'DELETE FROM 관심종목 WHERE ID=?';
    connection.query(sql, ID, (err, data, fileds)=>{
        if(err) throw err;
    });

    sql = 'DELETE FROM 보유주식 WHERE ID=?';
    connection.query(sql, ID, (err, data, fileds)=>{
        if(err) throw err;
    });

    sql = 'DELETE FROM 종목토론게시판 WHERE ID=?';
    connection.query(sql, ID, (err, data, fileds)=>{
        if(err) throw err;
    });

    sql = 'DELETE FROM 사용자 WHERE ID=?';
    connection.query(sql, ID, (err, data, fileds)=>{
        if(err) throw err;
        callback(data);
    });
}

exports.postData=(data, callback)=>{
    var sql = 'UPDATE 사용자 SET 회원등급=? WHERE ID=?';
    connection.query(sql, data, (err, row, fileds)=>{
        if(err) throw err;
        callback(row);
    });
}