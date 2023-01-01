const express = require("express");
const app = express();
const port = 3000;

require("dotenv").config({ path: `mysql/.env.${app.get("env")}` });
const mysql = require("./mysql");

app.use(
  express.json({
    limit: "50mb",
  })
);

app.listen(port, () => {
  console.log("서버가 포트 3000번으로 시작되었습니다.");
});

app.get("/api/employees", async (req, res) => {
  const employeeList = await mysql.query("employeeList");
  res.send(employeeList);
});

app.get("/api/employee/:emp_no", async (req, res) => {
  const { emp_no } = req.params;
  const result = await mysql.query("employee", emp_no);
  res.send(result);
});

app.get("/api/salaries", async (req, res) => {
  const salariesList = await mysql.query("salariesList");
  res.send(salariesList);
});

app.post("/api/salary", async (req, res) => {
  const result = await mysql.query("salariesInsert", req.body.param);
  res.send(result);
});

app.put("/api/department/:dept_no", async (req, res) => {
  const { dept_no } = req.params;
  const result = await mysql.query("departmentUpdate", [
    req.body.param,
    dept_no,
  ]);
  res.send(result);
});

app.delete("/api/department/:dept_no", async (req, res) => {
  const { dept_no } = req.params;
  const result = await mysql.query("departmentDelete", dept_no);
  res.send(result);
});
