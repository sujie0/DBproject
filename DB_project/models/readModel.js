const express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');
const mysql      = require('mysql');
const dbconfig   = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);

exports.getData=(idx, callback)=>{
    var sql = 'SELECT idx, 닉네임, 회원등급, 글제목, 글내용, 이미지, 신고횟수 FROM 종목토론게시판 NATURAL JOIN 사용자 WHERE idx=?';
    connection.query(sql, idx, (err, data, fileds)=>{
        if(err) throw err;
        callback(data);
    });
}

exports.getComment=(idx, callback)=>{
    var sql = 'SELECT idx, 닉네임, 댓글 FROM 종목토론게시판_댓글 NATURAL JOIN 사용자 WHERE 게시판idx=? ORDER BY idx';
    connection.query(sql, idx, (err, comments, fileds)=>{
        if(err) throw err;
        callback(comments);
    });
}

exports.deleteComment=(idx, callback)=>{
    var sql = 'DELETE FROM 종목토론게시판_댓글 WHERE 게시판idx=?';
    connection.query(sql, idx, (err, result, fileds)=>{
        if(err) throw err;
        callback(result);
    });
}

exports.deleteData=(idx, callback)=>{
    var sql = 'DELETE FROM 종목토론게시판 WHERE idx=?';
    connection.query(sql, idx, (err, data, fileds)=>{
        if(err) throw err;
        callback(data);
    });
}

exports.checkIdx=(board_idx, callback)=>{
    var sql = 'SELECT * FROM 종목토론게시판 WHERE idx=?';
    connection.query(sql, board_idx, (err, permit, fileds)=>{
        if(err) throw err;
        callback(permit);
    });
}

exports.postComment=(data, callback)=>{
    var sql = 'INSERT INTO 종목토론게시판_댓글(게시판idx, ID, 댓글) VALUES(?, ?, ?)';
    connection.query(sql, data, (err, result, fileds)=>{
        if(err) throw err;
        callback(result);
    });
}