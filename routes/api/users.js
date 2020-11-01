var express = require('express');
var router = express.Router();

var passport = require('passport');
var authService = require('../../services/user.service');
const jwt = require('../../services/jwt')
var auth = require('../auth');
const userService = require('../../services/user.service');

// 유저 토큰 재발급
router.get('/user', async function(req, res, next) {
  const user_id = jwt.authCheck(req, res) // 헤더 토큰 검사
  const rows = await authService.selectUserById(user_id);
  if (rows.length === 0) {return res.status(401).json({error: "토큰의 유저정보가 발견되지않음"})}
  else {
    const user = rows[0]
    const token = jwt.signToken(user.user_id); // 토큰 재발급
    return res.json({
      user: {
        user_id: user.user_id,
        token: token,
        email: user.email,
        name: user.name,
        official_exp: user.official_exp,
        regdate: user.regdate
      }
    });
  }
});

// 로그인
router.post('/login', async function(req, res, next) {
  const email = req.body.user.email;
  const pass = req.body.user.pass;
  if(!email){return res.status(422).json({errors: {email: "can't be blank"}});}
  if(!pass){return res.status(422).json({errors: {pass: "can't be blank"}});}

  const rows = await authService.login(email, pass);
  if (rows.length === 0) {
    return res.status(401).json({error: '입력하신 계정 정보가 없습니다.'});
  }else {
    const user = rows[0];
    const token = jwt.signToken(user.user_id) // 토큰 발급
    return res.json({
      user: {
        user_id: user.user_id,
        token: token,
        email: user.email,
        name: user.name,
        official_exp: user.official_exp,
        regdate: user.regdate
      }
    });
  }
});

// 회원가입
router.post('/register', async function(req, res, next) {
  const email = req.body.user.email;
  const pass = req.body.user.pass;
  const name = req.body.user.name;

  if (userService.register(email, pass, name)) {
    return res.json({
      task: true,
      message: "회원가입 완료"
    })
  }else {
    return res.status(423).json({error: '회원가입 오류'})
  }
})

module.exports = router;
