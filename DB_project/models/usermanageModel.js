const express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');
const mysql      = require('mysql');
const dbconfig   = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);

exports.deleteData=(ID, callback)=>{
    var sql = 'DELETE FROM 관심종목 WHERE ID=?';
    connection.query(sql, ID, (err, data, fileds)=>{
        if(err) throw err;
    });

    sql = 'DELETE FROM 보유주식 WHERE ID=?';
    connection.query(sql, ID, (err, data, fileds)=>{
        if(err) throw err;
    });

    sql = 'DELETE FROM 종목토론게시판_댓글 WHERE ID=?';
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