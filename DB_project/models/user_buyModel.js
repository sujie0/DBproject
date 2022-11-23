const express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');
const mysql      = require('mysql');
const dbconfig   = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);

module.exports={insertData(datas, callback){
    connection.query("INSERT INTO 보유주식 SET ?", datas, function(err, rows, fileds){
        if(err) {
            console.error("err : "+err);
            throw err;
        } 
        callback(rows);
    });
}}