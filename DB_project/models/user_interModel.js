const express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');
const mysql      = require('mysql');
const dbconfig   = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);

module.exports={get_interlist(ID, callback){
    connection.query('SELECT 종목코드 FROM 관심종목 WHERE ID = ?;', ID, (err, row, fileds)=>{  //관심종목 조회
        if(err) throw err;
        callback(row);
    });
}}