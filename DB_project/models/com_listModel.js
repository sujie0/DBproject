const express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');
const mysql      = require('mysql');
const dbconfig   = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);

module.exports={getList(callback){
    connection.query('SELECT * FROM 기업정보;', (err, row, fileds)=>{
        if(err) throw err;
        callback(row);
    });
    
}}

