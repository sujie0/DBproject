const express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');
const mysql      = require('mysql');
const dbconfig   = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);

module.exports={getData(idx,callback){
    connection.query('SELECT 종목코드, 기업이름, 상장주식수, 기업개요 FROM 기업정보 WHERE 종목코드=?;', idx, (err, row, fileds)=>{
        if(err) throw err;
        callback(row);
    });
}}