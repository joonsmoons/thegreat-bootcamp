// .ics - 아이캘린더 (iCalendar)
// 아이캘린더 - 인터넷 사용자들이 다른 인터넷 사용자에게 전자 메일을 이용해서 미팅 요청 혹은 할일 일정을 보내거나
// .ics 파일을 공유할 수 있게 해주는 파일 형식입니다

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

app.post("/api/ics", async (req, res) => {
  const { param } = req.body;
  const event = {
    start: [2022, 6, 30, 9, 30], // 년, 월, 일, 시간, 분
    duration: { hours: 1, minutes: 30 },
    title: "Node.js 스터디 모임",
    description: "개발자의 품격 스터디 모임",
    location: "제주특별자치도 제주시 더그레잇 3층",
    geo: { lat: 30.12, lon: 50.45 },
    url: "https://thegreat.io",
    organizer: { name: "Seungwon Go", email: "seungwon.go@gmail.com" },
    attendees: [
      {
        name: "유재석",
        email: "ryu@gmail.com",
        rsvp: true, // 회신여부
        role: "REQ-PARTICIPANT", // 필수 참석자
      },
      {
        name: "김종국",
        email: "kim@gmail.com",
        role: "OPT-PARTICIPANT", // 필수 참석자
      },
    ],
  };
  const r = await nodemailer.sendWithIcs(param, event);
  res.send(r);
});
