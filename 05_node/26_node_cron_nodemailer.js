const cron = require("node-cron");
require("dotenv").config({ path: "nodemailer/.env" });
const nodemailer = require("./nodemailer");
require("dotenv").config({ path: "mysql/.env" });
const mysql = require("./mysql");
const express = require("express");
const app = express();

// 정상적인 케이스 - 매일 특정 시간, 매주 월요일 아침 7시 등
const task = cron.schedule(
  "* * * * * *",
  async () => {
    const salariesList = await mysql.query("salariesList");
    const h = [];
    h.push('<table style="border:1px solid black; border-collapse:collapse;"');
    h.push("<thead>");
    h.push("<tr>");
    h.push('<th style="border:1px solid black;>Emp ID</th>');
    h.push('<th style="border:1px solid black;>Salary</th>');
    h.push("</tr>");
    h.push("</thead>");
    h.push("<tbody>");
    salariesList.forEach((salary) => {
      h.push("<tr>");
      h.push(`<td style="border:1px solid black;">${salary.emp_no}</td>`);
      h.push(`<td style="border:1px solid black;">${salary.salary}</td>`);
      h.push("</tr>");
    });
    h.push("</tbody>");
    h.push("</table>");

    const emailData = {
      from: "joonsmoons@gmail.com",
      to: "joonsmoons@gmail.com",
      subject: "신규 제품 카테고리 목록",
      html: h.join(""),
    };

    await nodemailer.send(emailData);
  },
  { scheduled: false }
);

app.listen(3000, () => {
  console.log("listening to port 3000....");
});

app.get("/task/start", (req, res) => {
  task.start();
  res.send("Task가 시작되었습니다.");
});

app.get("/task/top", (req, res) => {
  task.stop();
  req.send("Task가 종료 되었습니다.");
});
