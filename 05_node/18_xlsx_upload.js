const express = require("express");
const app = express();

const xlsx = require("xlsx");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().valueOf() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post("/api/xlsx", upload.single("xlsx"), async (req, res) => {
  console.log(req.file);
  const workbook = xlsx.readFile(req.file.path);
  const firstSheetName = workbook.SheetNames[0];
  const firstSheet = workbook.Sheets[firstSheetName];
  const firstSheetJson = xlsx.utils.sheet_to_json(firstSheet);
  res.send(firstSheetJson);
});

app.listen(3000, () => {
  console.log("listening to port 3000...");
});
