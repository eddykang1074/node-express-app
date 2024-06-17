var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//기본 샘플 라우터 모듈 파일 참조 영역 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//게시글 웹페이지 요청/응답 라우터모듈 파일 참조 
var articleRouter = require('./routes/article');


//mysql 서버와 연결합니다.  
var sequelize = require('./models/index.js').sequelize;

var app = express();

//DB 객체를  기반으로 DB객체,모델파일과  물리적 Database,Table들을 동기화 처리합니다. 
sequelize.sync(); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//기본 샘플 라우터 모듈의 기본 URL주소 정의영역 
app.use('/', indexRouter);
app.use('/users', usersRouter);

//게시글 웹페이지 라우터 모듈의 기본 URL주소 정의 
app.use('/article', articleRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
