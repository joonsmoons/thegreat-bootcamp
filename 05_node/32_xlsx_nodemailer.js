require("dotenv").config({ path: "./nodemailer/.env" });
const nodemailer = require("./nodemailer/index_new");
require("dotenv").config({ path: "./mysql/.env.test" });
const mysql = require("./mysql");
const xlsx = require("xlsx");

const express = require("express");
const app = express();
app.use(
  express.json({
    limit: "50mb",
  })
);

app.listen(3001, () => {
  console.log("listening to port 3001...");
});

const sendAttachmentEmail = async (emailData, workbook) => {
  // const emailData = {
  //   from: "joonsmoons@gmail.com",
  //   to: "joonsmoons@gmail.com",
  //   subject: "Mailing Salaries List!",
  //   test: "엑셀 파일을 첨부해서 이메일을 보내드립니다.",
  //   attachment: [
  //     {
  //       filename: "Salaries.xlsx",
  //       content: Buffer.from(
  //         xlsx.write(workbook, { type: "base64" }, "base64")
  //       ),
  //     },
  //   ],
  // };
  emailData.attachments = [
    {
      filename: "Salaries.xlsx",
      content: Buffer.from(xlsx.write(workbook, { type: "base64" }, "base64")),
    },
  ];
  const r = await nodemailer.send(emailData);
  return r;
};

app.post("/api/email/attachment", async (req, res) => {
  const salariesList = await mysql.query("salariesList");
  const workbook = xlsx.utils.book_new();
  const firstSheet = xlsx.utils.json_to_sheet(salariesList, {
    header: ["emp_no", "salary", "from_date", "to_date"],
    skipHeader: false,
  });
  firstSheet["!cols"] = [{ wpx: 160 }, { wpx: 160 }, { wpx: 200 }, { wpx: 80 }];
  xlsx.utils.book_append_sheet(workbook, firstSheet, "Salaries");
  const r = await sendAttachmentEmail(req.body.param, workbook);
  res.send(r);
});
