const express = require("express");
const router = express.Router();
const mysql = require("../mysql");

// /api/employees/all
router.get("/all", async (req, res) => {
  const employeeList = await mysql.query("employeeList");
  res.send(employeeList);
});

router.get("/:emp_no", async (req, res) => {
  const { emp_no } = req.params;
  const result = await mysql.query("employee", emp_no);
  res.send(result);
});

module.exports = router;
