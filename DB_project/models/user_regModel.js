const express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');
const mysql      = require('mysql');
const dbconfig   = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);

module.exports={insertData(datas, callback){ //회원가입
    connection.query("INSERT INTO 사용자 SET ?", datas, function(err, rows, fileds){
        if(err) {
            console.error("err : "+err);
            throw err;
        } 
        callback(rows);
    });
}}