const express = require("express");
const router = express.Router();
const mysql = require("../mysql");

router.put("/:dept_no", async (req, res) => {
  const { dept_no } = req.params;
  const result = await mysql.query("departmentUpdate", [
    req.body.param,
    dept_no,
  ]);
  res.send(result);
});

router.delete("/:dept_no", async (req, res) => {
  const { dept_no } = req.params;
  const result = await mysql.query("departmentDelete", dept_no);
  res.send(result);
});

module.exports = router;
