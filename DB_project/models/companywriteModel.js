const express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');
const mysql      = require('mysql');
const dbconfig   = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);

exports.checkCode=(Code, callback)=>{
    var sql = 'SELECT * FROM 기업정보 WHERE 종목코드=?';
    connection.query(sql, Code, function(err, permit, fileds){
        if(err) throw err;
        callback(permit); 
    });
}

exports.insertData=(data, callback)=>{
    var sql='INSERT INTO 종목코드(종목코드, 종목명) VALUES(?, ?)';
    var data_temp=[data[0], data[1]];
    connection.query(sql, data_temp, function(err, rows, fileds){
        if(err) throw err;
    });
    
    sql='INSERT INTO 기업정보(종목코드, 기업이름, 상장주식수, 기업개요) VALUES(?, ?, ?, ?)';
    
    connection.query(sql, data, function(err, rows, fileds){
        if(err) throw err;
        
        callback();
    });
}