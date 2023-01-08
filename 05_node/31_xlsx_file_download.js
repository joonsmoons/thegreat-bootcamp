const express = require("express");
const app = express();
require("dotenv").config({ path: "./mysql/.env.test" });
const mysql = require("./mysql");
const xlsx = require("xlsx");

app.listen(3000, () => {
  console.log("listening to port 3000...");
});

app.get("/api/xlsx/download", async (req, res) => {
  const salariesList = await mysql.query("salariesList");
  const workbook = xlsx.utils.book_new();
  const firstSheet = xlsx.utils.json_to_sheet(salariesList, {
    header: ["emp_no", "salary", "from_date", "to_date"],
    skipHeader: false,
  });
  firstSheet["!cols"] = [{ wpx: 160 }, { wpx: 160 }, { wpx: 200 }, { wpx: 80 }];
  xlsx.utils.book_append_sheet(workbook, firstSheet, "salaries");
  res.setHeader("Content-disposition", "attachment; filename=Salaries.xlsx");
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  const downloadFile = Buffer.from(
    xlsx.write(workbook, { type: "base64" }),
    "base64"
  );
  res.end(downloadFile);
});
