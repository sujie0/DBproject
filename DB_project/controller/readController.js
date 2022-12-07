const readModel = require('../models/readModel');
const express = require('express');
const { json } = require('express');
const CODE = require('../modules/statusCode');
const url = require('url');

module.exports={
    readData : function(req, res, next){
        var session = req.session.ID;
        var idx = req.params.idx;
        try{
        readModel.getData(idx, (data)=>{
            if(!data[0])
                return res.send("<script>alert('게시물이 존재하지 않습니다.'); history.go(-1); </script>");

            try{ //댓글 read
                readModel.getComment(idx, (comments)=>{
                    console.log("data : "+JSON.stringify(data));

                    if(comments[0]){ //댓글이 존재하는 경우 댓글도 get
                        console.log("read에서 해당 게시글의 댓글 조회 : "+JSON.stringify(comments));
                    }

                    res.render('read',{title: "게시판", data: data[0], comments: comments, session : session});
                });
            }catch(err){
                console.log(err);
                next(err);
                return res.json({ statusCode: CODE.DB_CONNECTION_ERROR, msg: "DB connection error"});
            }
            
            //res.render('read',{title: "게시판", data: data[0]}); // -> ejs에서 fornt와 연결하는 방법
            //return res.json({ statusCode: CODE.SUCCESS, msg: "Sucess read data" });
        });
        }catch(err){
            console.log(err);
            next(err);
            return res.json({ statusCode: CODE.DB_CONNECTION_ERROR, msg: "DB connection error"});
        }
    },

    deleteData : function(req, res, next){
        var idx = req.params.idx;
        //var queryData=url.parse(req.url,true).query;
        //var idx=queryData.idx;

        try{
            readModel.deleteComment(idx, (result)=>{
                try{
                    readModel.deleteData(idx, (data)=>{
                        if(!data.affectedRows)
                            return res.send("<script>alert('존재하지 않는 게시물입니다.'); history.go(-1); </script>");
                        console.log("data : "+JSON.stringify(data));

                        res.redirect('/board');
                        //return res.json({ statusCode : CODE.SUCCESS, msg : "Success delete board"});
                    });
                }catch(err){
                    console.log(err);
                    next(err);
                    return res.json({ statusCode : CODE.DB_CONNECTION_ERROR, mesg: "DB connection error"});
                }
            });
        }catch(err){
            console.log(err);
            next(err);
            return res.json({ statusCode : CODE.DB_CONNECTION_ERROR, mesg: "DB connection error"});
        }
        /*
        try{
            readModel.deleteData(idx, (data)=>{
                if(!data.affectedRows)
                    return res.json({ statusCode : CODE.FAIL, msg : "존재하지 않는 게시물입니다."});
                console.log("data : "+JSON.stringify(data));
                return res.json({ statusCode : CODE.SUCCESS, msg : "Success delete board"});
            });
        }catch(err){
            console.log(err);
            next(err);
            return res.json({ statusCode : CODE.DB_CONNECTION_ERROR, mesg: "DB connection error"});
        }
        */
    },

    postComment : function(req, res, next){
        var board_idx = req.params.board_idx;
        var ID = req.session.ID;
        if(!ID)
            return res.send("<script>alert('로그인이 필요한 서비스입니다.'); window.location.replace('/user/login'); </script>");
            //return res.json({statusCode: CODE.FAIL, msg : "로그인 해주세요"});
        //var ID = req.body.ID; //로그인 구현된 후에 여기 수정 필요
        var Comment = req.body.Comment;
        var data = [board_idx, ID, Comment, board_idx];
        
        if(!Comment)
            return res.json({ statusCode : CODE.FAIR, mesg: "댓글을 작성해주세요"});

        try{
            readModel.checkIdx(board_idx, (permit)=>{
                console.log("permit : "+JSON.stringify(permit));
                if(permit[0]) //해당 게시물이 존재하는 경우
                {
                    try{
                        readModel.postComment(data, (result)=>{
                            
                            console.log("result : "+JSON.stringify(result));
                            return res.redirect('/board/read/'+board_idx);
                            //return res.json({ statusCode : CODE.SUCCESS, mesg: "댓글 작성 완료"});
                        });
                    }catch(err){
                        console.log(err);
                        next(err);
                        return res.json({ statusCode : CODE.DB_CONNECTION_ERROR, mesg: "DB connection error"});
                    }
                }
                else
                    return res.send("<script>alert('해당 게시물이 존재하지 않습니다.'); history.go(-1); </script>");
            });
        }catch(err){
            console.log(err);
            next(err);
            return res.json({ statusCode : CODE.DB_CONNECTION_ERROR, mesg: "DB connection error"});
        }
    }
}