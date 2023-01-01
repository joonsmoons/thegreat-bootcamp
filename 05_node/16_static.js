const express = require("express");
const app = express();

// http://localhost:3000/images/logo.jpg 접근 가능
app.use(express.static("public"));

// https://localhost:3000/static/images/logo.jpg 접근 가능
app.use("/static", express.static("public"));

app.listen(3000, () => {
  console.log("listening to port 3000...");
});
