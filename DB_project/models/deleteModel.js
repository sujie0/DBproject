const express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');
const mysql      = require('mysql');
const dbconfig   = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);

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