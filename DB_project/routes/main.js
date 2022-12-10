var express = require('express');
var router = express.Router();
const top_listModel = require('../models/top_listModel');
var listModel = require('../models/listModel');
var com_listModel = require('../models/com_listModel');

router.get('/', async function(req, res, next){
    var ID = req.session.ID;

    try{
        top_listModel.getList((data1)=>{
            //console.log('data: '+JSON.stringify(data1));
            try{
                listModel.getList((data2)=>{
                //console.log('data: '+JSON.stringify(data2));
                try{
                    com_listModel.getList((data3)=>{
                        //console.log('data: '+JSON.stringify(data3));   
                        res.render('main',{data1: data1, data2:data2, data3:data3, session : ID});
                    });
                }catch(err){
                    console.log(err);
                    next(err);
                    return res.json({ statusCode: CODE.DB_CONNECTION_ERROR, msg: "DB connection error"});
                }

            });
            }catch(err){
                console.log(err);
                next(err);
                return res.json({ statusCode: CODE.DB_CONNECTION_ERROR, msg: "DB connection error"});
            }
        });
    }catch(err){
        console.log(err);
        next(err);
        return res.json({ statusCode: CODE.DB_CONNECTION_ERROR, msg: "DB connection error"});
    }
});

module.exports = router;