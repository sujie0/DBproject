const express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');
const mysql      = require('mysql');
const dbconfig   = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);

module.exports={getList(callback){
    connection.query('SELECT idx, 종목코드, 기업이름, 상장주식수 FROM 기업정보;', (err, row, fileds)=>{
        if(err) throw err;
        callback(row);
    });
    
}}

