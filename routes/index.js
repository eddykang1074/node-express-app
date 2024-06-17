//index.js 라우팅 모듈 어플리케이션 공통 기능에 대한 요청과 응답을 처리합니다.
//index.js 라우팅 모듈의 기본 라우팅호출 주소는 http://localhost:3000/ 입니다. 
//라우팅 모듈의 기본 주소체계 정의는 app.js 내 라우팅 모듈 기본 주소 설정영역에서 정의합니다.

//express 패키지를 참조합니다.
var express = require('express');

//express객체의 Router()메소드를 호출하여 사용자 요청과 응답을 처리하는 router 객체를 생성합니다. 
var router = express.Router();

/* 
- 메인 페이지 요청과 응답 처리 라우팅 메소드 
-요청주소 : http://localhost:3000/
-요청방식 : GET 방식
-응답결과 : index.ejs 뷰파일 웹페이지 내용
*/
router.get('/', function(req, res, next) {
  res.render('index', { title: "메인 페이지" });
});

/*
- 회원가입 웹페이지 요청과 응답처리 라우팅메소드
-요청주소 : http://localhost:3000/entry
-요청방식 : GET 방식
-응답결과 : entry.ejs 뷰파일 웹페이지 내용
*/
//router.get();

/*
- 로그인 웹페이지 요청과 응답처리 라우팅메소드
-요청주소 : http://localhost:3000/login
-요청방식 : GET 방식
-응답결과 : login.ejs 뷰파일내 웹페이지 내용
*/
//router.get();


/*
- 문의하기 웹페이지 요청과 응답처리 라우팅메소드
-요청주소 : http://localhost:3000/contact
-요청방식 : GET 방식
-응답결과 : contact.ejs 뷰파일내 웹페이지 내용
*/
//router.get();


//반드시 라우터 객체를 index.js모듈 외부로 내보내기 합니다. 
module.exports = router;
