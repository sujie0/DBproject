const express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');
const mysql      = require('mysql');
const dbconfig   = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);

exports.getPrice=(code, callback)=>{
    var sql = 'SELECT 시가 FROM 종목시세 WHERE 종목코드=? ORDER BY 날짜 desc';
    connection.query(sql, code, (err, data, fileds)=>{
        if(err) throw err;
        callback(data);
    });
}

exports.insertData=(datas, callback)=>{
    var sql = 'INSERT INTO 보유주식 SET ?';
    connection.query(sql, datas, (err, result, fileds)=>{
        if(err) throw err;
        callback(result);
    })
}

/*
module.exports={insertData(datas, callback){
    connection.query("INSERT INTO 보유주식 SET ?", datas, function(err, rows, fileds){
        if(err) {
            console.error("err : "+err);
            throw err;
        } 
        callback(rows);
    });
}}
*/