const express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');
const mysql      = require('mysql');
const dbconfig   = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);

module.exports={getList(callback){
    var sql='SELECT ID, 사용자명, 닉네임, 이메일, 회원등급 FROM 사용자';
        
    connection.query(sql, (err, data, fileds)=>{
        if(err) throw err;

        callback(data);
    });
}}