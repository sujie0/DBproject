const express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');
const mysql      = require('mysql');
const dbconfig   = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);

module.exports={getList(callback){  //거래상위순으로 조회하기 
    connection.query('SELECT * FROM 종목코드 s natural join top종목 t where t.종목코드 = s.종목코드 order by 거래량 desc;', (err, data, fileds)=>{
        if(err) throw err;
        callback(data);
    });
    
}}