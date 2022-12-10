const updateModel = require('../models/updateModel');
const checkUserMode = require('../models/checkUserModel');
const express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');
var url = require('url');

exports.updateForm=(req, res, next)=>{
    var queryData=url.parse(req.url,true).query;
    var idx=queryData.idx;
    var ID = req.session.ID;

    try{
        checkUserMode.checkUser(idx, (permit)=>{
            console.log("permit : "+permit[0].ID);
                if(ID!=permit[0].ID)
                return res.send("<script>alert('게시물 작성자만 수정 가능합니다.'); window.location.replace('/board'); </script>");
                    //return res.json({statusCode : CODE.FAIL, msg : "게시물 작성자만 수정 가능합니다."});
                else{  
                    updateModel.getData(idx, (row)=>{
                        try{
                            if(!row[0])
                                return res.send("<script>alert('해당 게시글이 존재하지 않습니다.'); history.go(-1); </script>");
                            
                            try{
                                updateModel.getComment(idx, (comments)=>{
                                    console.log("update에서 1개 글 조회 결과 확인 : "+JSON.stringify(row));
                                    if(comments[0]){ //댓글이 존재하는 경우 댓글도 get
                                        console.log("update에서 해당 게시글의 댓글 조회 : "+JSON.stringify(comments));
                                    }
                                    res.render('update',{row: row[0], session : ID});
                                    //return res.json({ statusCode: CODE.SUCCESS, msg: "update 전 글 read success"});
                                });
                            }catch(err){
                                console.log(err);
                                next(err);
                                return res.json({ statusCode: CODE.DB_CONNECTION_ERROR, msg: "DB connection error"});
                            }
                        }catch(error){
                            console.log(err);
                            next(err);
                            return res.json({ statusCode: CODE.DB_CONNECTION_ERROR, msg: "DB connection error"});
                        }
                    });
                }
        });
    }catch(err){
        console.log(err);
        next(err);
        return res.json({statusCode : CODE.DB_CONNECTION_ERROR, msg : "DB connection error"});
    }
    
}


exports.updateData=(req, res, next)=>{
    console.log(JSON.stringify(req.body));

    var Title = req.body.Title;
    var Content = req.body.Content;
    //var queryData=url.parse(req.url,true).query;
    //var idx=queryData.idx;
    var idx = req.body.idx;

    if(!Title)
        console.log("title이 null이다.");
        
    if(!req.file){ //file을 입력하지 않은 경우
        var data=[Title, Content, idx];
        console.log("이 경우이다.");
    }
    else{ //file을 입력한 경우
        var Image='/images/'+req.file.filename;
        var data = [Title, Content, Image, idx];
    }

    for(var i=0;i<data.length;i++){
        if(!data[i])
            return res.json({ statusCode: CODE.FAIL, msg: "모든 내용을 입력해주세요" });
    }

    try{
        updateModel.updateData(data,(result)=>{
            if(!result.affectedRows)
                return res.json({ statusCode: CODE.FAIL, msg: "잘못된 요청으로 변경되지 않았습니다."});
            console.log("result : "+JSON.stringify(result));
            //return res.json({ statusCode: CODE.SUCCESS, msg: "Sucess update data" });
            return res.redirect('/board/read/'+idx);
        });
    }catch(err){
        console.log(err);
        next(err);
        return res.json({ statusCode: CODE.DB_CONNECTION_ERROR, msg: "DB connection error"});
    }
}