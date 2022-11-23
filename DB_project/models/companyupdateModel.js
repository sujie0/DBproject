const express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');
const mysql      = require('mysql');
const dbconfig   = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);

exports.getData=(Code, callback)=>{
    var sql='SELECT * FROM 기업정보 WHERE 종목코드=?';
    connection.query(sql, Code, (err, row, fileds)=>{
        if(err) throw err;
        callback(row);
    });
}


exports.Update=(data, callback)=>{
    var sql='UPDATE 기업정보 SET 종목코드=?, 기업이름=?, 상장주식수=?, 기업개요=? WHERE 종목코드=?';
    connection.query(sql, data, (err, result, fileds)=>{
        if(err) console.error("글 수정 중 에러 발생 err : "+err);
        callback(result);
    });
}
