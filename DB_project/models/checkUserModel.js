const express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');
const mysql      = require('mysql');
const dbconfig   = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);

exports.checkUser=(ID, callback)=>{
    var sql = 'SELECT ID FROM 종목토론게시판 WHERE ID=?';
    //var sql = 'SELECT 닉네임, 회원등급, 글제목, 글내용, 이미지, 신고횟수 FROM 종목토론게시판 NATURAL JOIN 사용자 WHERE idx=?';
    connection.query(sql, ID, (err, permit, fileds)=>{
        if(err) throw err;
        callback(permit);
    });
}
