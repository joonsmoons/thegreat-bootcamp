const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  // 파일 중복 업로드도 가능해서 파일명을 정의해야함
  filename: function (req, file, cb) {
    // 시스템시간으로 파일명을 변경해서 올림
    cb(null, new Date().valueOf() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// 하나의 파일만 업로드
app.post("/api/attachment", upload.single("attachment"), async (req, res) => {
  res.send(req.file);
});

// 파일 여러개
app.post("/api/attachments", upload.array("attachments"), async (req, res) => {
  res.send(req.files);
});

app.listen(3000, () => {
  console.log("listening for port 3000...");
});
