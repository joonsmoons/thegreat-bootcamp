// Node mailer

// 다른 모듈 의존성 0
// 유니코드를 지원함 - 영어, 한국어, 중국어 다양한 언어로 메일을 작성 할 수 있음
// 파일 첨부 가능
// 이메일 본문에 일반 텍스트 + HTML도 가능
// OAuth2
// SMTP 연결을 위한 프록시 사용 가능

const express = require("express");
const app = express();

require("dotenv").config({ path: "nodemailer/.env" });
const nodemailer = require("./nodemailer");

app.use(
  express.json({
    limit: "50mb",
  })
);

app.listen(3000, () => {
  console.log("listening to port 3000...");
});

app.post("/api/email", async (req, res) => {
  console.log(req.body.param);
  const { param } = req.body;
  const r = await nodemailer.send(param);
  res.send(r);
});
