const express = require("express");
const router = express.Router();
const mysql = require("../mysql");

router.get("/all", async (req, res) => {
  const salariesList = await mysql.query("salariesList");
  res.send(salariesList);
});

router.post("/", async (req, res) => {
  const result = await mysql.query("salariesInsert", req.body.param);
  res.send(result);
});

module.exports = router;
