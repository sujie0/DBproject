const express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');
const mysql      = require('mysql');
const dbconfig   = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);

module.exports={deleteData(datas, ID, callback){

    connection.query("UPDATE 보유주식 SET 매도주식수 = ?, 매도가 = ?, 매도일 = ? WHERE ID = ? AND 종목코드 = ?", [datas.매도주식수, datas.매도가, datas.매도일, ID, datas.종목코드], function(err, rows, fileds){
        if(err) {
            console.error("err : "+err);
            throw err;
        } 
        callback(rows);
    });

}}