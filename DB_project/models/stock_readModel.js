const express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');
const mysql      = require('mysql');
const dbconfig   = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);

module.exports={getData(code, callback){
    connection.query('SELECT 날짜, 시가, 고가, 저가, 종가, 거래량 FROM 종목시세 WHERE 종목코드=?;', code, (err, row, fileds)=>{
        if(err) throw err;
        callback(row);
    });
}}