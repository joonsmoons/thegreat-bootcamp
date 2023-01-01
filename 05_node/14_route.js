const express = require("express");
const app = express();

app.use(
  express.json({
    limit: "50mb",
  })
);

app.listen(3000, () => {
  console.log("listening to PORT 3000...");
});

// http://localhost:3000/abcd
// http://localhost:3000/acd
// ? - ? 바로 앞에 문자가 0개 혹은 1개
// app.get("/ab?cd", (req, res) => {
//   res.send("ab?cd");
// });

// // + - + 바로 앞에 문자가 1개 이상
// app.get("/ab+cd", (req, res) => {
//   res.send("ab+cd");
// });

// a 문자가 들어있으면
app.get(/a/, (req, res) => {
  res.send("/a/");
});
