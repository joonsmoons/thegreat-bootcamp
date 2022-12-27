const fs = require("fs");
// fs - filesystem

// 비동기 방식
// fs.readFile("./sample/text.txt", "utf8", (err, data) => {
//   if (err) {
//     throw err;
//   }
//   console.log(data);
// });

// 동기 방식
const data = fs.readFileSync("./sample/text.txt", "utf8");
console.log(data);

const txt = "파일 쓰기 테스트";
fs.writeFile("./sample/writeText.txt", txt, "utf8", (err) => {
  if (err) {
    throw err;
  }
  const data2 = fs.readFileSync("./sample/writeText.txt", "utf8");
  console.log(data2);
});

fs.writeFileSync("./sample/writeText2.txt", txt, "utf8");
const data2 = fs.readFileSync("./sample/writeText2.txt", "utf8");
console.log(data2);
