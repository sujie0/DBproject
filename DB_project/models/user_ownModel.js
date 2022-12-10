const { json } = require('express');
const CODE = require('../modules/statusCode');
const mysql      = require('mysql');
const dbconfig   = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);

module.exports={get_ownlist(ID, callback){
    connection.query('SELECT * FROM 보유주식 WHERE ID = ?;', ID, (err, row, fileds)=>{  //보유주식 조회
        if(err) throw err;
        callback(row);
    });
}}