const express = require('express');
const crypto = require('crypto');
const { json } = require('express');
const CODE = require('../modules/statusCode');
const mysql      = require('mysql');
const dbconfig   = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);

module.exports={getData(body, callback){ //로그인
    connection.query("SELECT * FROM 사용자 WHERE ID = ?", body.ID, function(err, rows, fileds){
        if(err) {
            console.error("err : "+err);
            throw err;
        }
        callback(rows);
    });
}}