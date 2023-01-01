// express
const express = require("express");
const app = express();
const port = 3001;

app.use(express.json({ limit: "50mb" })); // 최대 크기 50mb

app.listen(port, () => {
  console.log("서버가 포트 3001번으로 시작되었습니다.");
});

// 라우터 (주소 + http method)
app.get("/", (req, res) => {
  res.send("Hello World");
});

// http://localhost:3000/customers get
app.get("/customers", (req, res) => {
  const customers = [
    { name: "John Doe", email: "john@gmail.com" },
    { name: "Jane Doe", email: "jane@gmail.com" },
  ];
  res.send(customers);
});

// http://localhost:3000/customer get
app.get("/customer/:id", (req, res) => {
  const { id } = req.params;
  const customers = [
    { id: 1, name: "John Doe", email: "john@gmail.com" },
    { id: 2, name: "Jane Doe", email: "jane@gmail.com" },
  ];
  const customer = customers.find((customer) => customer.id === parseInt(id));
  console.log(customer);
  if (customer) {
    res.status(200).send(customer);
  } else {
    res.status(401).send({ msg: "존재하지 않은 ID 입니다." });
  }
});

app.post("/customer", (req, res) => {
  const { param } = req.body;
  console.log(param);
});
