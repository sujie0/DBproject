const dotenv = require("dotenv");
dotenv.config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
var path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');

var createError = require('http-errors');
var logger = require('morgan');

const boardRouter = require('./routes/board');
const companyRouter = require('./routes/company');
const managerRouter = require('./routes/manager');
const userRouter = require('./routes/user');   //이용자 기능

const app = express();

app.set('port', process.env.PORT || 8080);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('layout','layout'); // ->여기부분 나중에 메뉴바 추가하면 추가
app.set('layout extractScripts', true); // ->여기부분 나중에 메뉴바 추가하면 추가

app.use(express.json());
app.use(expressLayouts);
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(
  session({
    key: "sid",
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24000 * 60 * 60 //쿠키 유효시간 24시간 
    }
  })
);

app.use('/board', boardRouter);
app.use('/company', companyRouter); //주식회사
app.use('/manager',managerRouter);
app.use('/user', userRouter);       //이용자

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send(err.message);
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});
