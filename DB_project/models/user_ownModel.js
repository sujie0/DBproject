const { json } = require('express');
const CODE = require('../modules/statusCode');
const mysql      = require('mysql');
const dbconfig   = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);

module.exports={get_ownlist(ID, callback){
    connection.query('SELECT 종목코드, 매수주식수, 매수가, 매수일, 매도주식수, 매도가, 매수일 FROM 보유주식 WHERE ID = ?;', ID, (err, row, fileds)=>{  //보유주식 조회
        if(err) throw err;
        callback(row);
    });
}}