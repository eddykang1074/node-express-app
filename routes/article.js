//express 패키지를 참조합니다.
var express = require('express');

//express객체의 Router()메소드를 호출하여 사용자 요청과 응답을 처리하는 서버측 router 객체를 생성합니다. 
//일반적으로 서버측 각각의 라우팅 모듈은 추후 app.js내에서 기본 URL주소체계를 정의하게 되며
//article.js 라우팅 모듈의  기본주소 체계로  http://localhost:3000/article 를 사용할 예정입니다.  
var router = express.Router();


//ORM db객체 참조하기 
var db = require('../models/index');


/* 
- 게시글 목록 웹 페이지 요청과 응답 처리 라우팅 메소드 
-요청주소 : http://localhost:3000/article/list
-요청방식 : GET 방식
-응답결과 : article/list.ejs 뷰파일 웹페이지 내용
*/
router.get('/list', async(req, res, next) => {

    //테스트 게시글 목록 데이터 
    // const articles =[
    //     {
    //         aid: 1,
    //         title: "제목1입니다.",
    //         content:"내용1입니다.",
    //         view_cnt:0,
    //         display_yn:1,
    //         ip_address:"111.111.111.111",
    //         regist_date: Date.now(),
    //         regist_user_name: "강창훈"
    //     },
    //     {
    //         aid: 2,
    //         title: "제목2입니다.",
    //         content:"내용2입니다.",
    //         view_cnt:0,
    //         display_yn:1,
    //         ip_address:"222.222.222.222",
    //         regist_date: Date.now(),
    //         regist_user_name: "강창훈"
    //     },
    // ];


    //DB article 테이블에서 모든 데이터 목록을 조회해온다.
    const articles = await db.Article.findAll();    

    //게시글 목록 뷰파일을 반환합니다.
    res.render('article/list.ejs',{articles:articles});
});


/* 
- 게시글 등록 웹 페이지 요청과 응답 처리 라우팅 메소드 
-요청주소 : http://localhost:3000/article/create
-요청방식 : GET 방식
-응답결과 : article/create.ejs 뷰파일 웹페이지 내용
*/
router.get('/create', function(req, res, next) {
    //게시글 등록 뷰파일을 반환합니다.
    res.render('article/create');
});


/* 
- 게시글 입력 정보 등록 처리 요청과 응답 처리 라우팅 메소드 
-요청주소 : http://localhost:3000/article/create
-요청방식 : POST 방식
-응답결과 : http://localhost:3000/article/list 페이지로 이동처리(도메인주소생략)
*/
router.post('/create', async(req, res, next)=> {
    
    //Step1: 게시글 등록 데이터 추출하기 
    const title = req.body.title;
    const content = req.body.content;
    const display_yn = req.body.display_yn;
    const regist_user_name = req.body.regist_user_name

    //Step2: DB 신규 등록 단일게시글 정보 준비하기 
    const article ={
        title: title,
        content, //속성명과 변수명이 동일하면 변수명 생략가능(ES6문법)
        view_cnt:0,
        ip_address:req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        display_yn:display_yn,
        regist_date: Date.now(),
        regist_user_name: regist_user_name
    };

    //Step3: DB 해당 게시글 신규 등록 처리하기 
    const savedArticle = await db.Article.create(article);


    //step4: 등록 완료후 http://localhost:3000/article/list 페이지로 이동처리(도메인주소생략)
    res.redirect("/article/list");
});



/* 
- 게시글 정보 확인/수정 웹 페이지 요청과 응답 처리 라우팅 메소드 
-요청주소 : http://localhost:3000/article/modify/1 
-요청방식 : GET 방식
-응답결과 : article/modify.ejs 뷰파일 웹페이지 내용
*/
router.get('/modify/:aid', async(req, res, next) =>{

    //Step1:게시글 고유번호 추출하기(파라메터방식의 경우 와일드카드 키값을 통해 추출가능)
    const articleId = req.params.aid;

    //Step2: DB에서 해당 게시글 정보 조회해오기 
    const article = await db.Article.findOne({where:{aid:articleId}});

    //Step3:DB에서 조회한 단일 게시글정보(예시데이터) 
    // const article ={
    //     aid: articleId,
    //     title: "게시글1 제목입니다.",
    //     content: "게시글1 내용입니다.",
    //     view_cnt:0,
    //     ip_address:req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    //     display_yn:"1",
    //     regist_date: Date.now(),
    //     regist_user_name: "강창훈"
    // };
    
    //step5:modify.ejs 뷰파일에 단일 게시글 정보를 json 형식으로 전달하기
    res.render('article/modify',{article:article});
});


/* 
- 게시글 수정 처리 요청 및 응답 처리 라우팅 메소드 
-요청주소 : http://localhost:3000/article/modify
-요청방식 : POST 방식
-응답결과 : http://localhost:3000/article/list 페이지로 이동처리(도메인주소생략)
*/
router.post('/modify/:aid', async(req, res, next) =>{

    //Step1:게시글 고유번호 추출하기(파라메터방식의 경우 와일드카드 키값을 통해 추출가능)
    const articleId = req.params.aid;
  
    //Step1: 게시글 수정데이터 추출하기 
    const title = req.body.title;
    const content = req.body.content;
    const display_yn = req.body.display_yn;
    const modify_user_name = req.body.modify_user_name;

    //Step2: DB 수정 단일게시글 정보 준비하기 
    const article ={
        title: title,
        content, //속성명과 변수명이 동일하면 변수명 생략가능(ES6문법)
        display_yn,
        ip_address:req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        moidify_date: Date.now(),
        modify_user_name: modify_user_name
    };

    //Step3: DB 해당 게시글 수정 처리하기 
    await db.Article.update(article,{where:{aid:articleId}});

    //step4: 수정완료후 http://localhost:3000/article/list 페이지로 이동처리(도메인주소생략)
    res.redirect("/article/list");
});



/* 
- 게시글 삭제 처리 요청 및 응답처리 라우팅 메소드
-요청주소 : http://localhost:3000/article/remove?aid=1
-요청방식 : Get 방식
-응답결과 : http://localhost:3000/article/list 페이지로 이동처리(도메인주소생략)
*/
router.get('/remove', async(req, res, next) => {
    //step1: 게시글 고유번호 추출하기 
    //QueryString방식으로 전달된 게시글 고유번호 추출하기
    const articleId = req.query.aid;

    //step2: DB에서 해당 게시글 정보 삭제처리하기
    await db.Article.destroy({where:{aid:articleId}});

    //step3: 삭제완료후 http://localhost:3000/article/list 페이지로 이동처리(도메인주소생략)
    res.redirect("/article/list");
});



//반드시 라우터 객체를 모듈 외부로 내보내기 합니다. 
module.exports = router;

  