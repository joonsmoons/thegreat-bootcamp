const path = require("path");
console.log(__dirname); // 현재 실행되고 있는 파일의 디렉토리 경로
console.log(__filename); // 현재 실행되고 있는 파일의 경로
console.log(path.basename(__filename)); // 경로의 마지막 부분
console.log(path.basename(__filename, ".js")); // 경로의 마지막 부분에서 확장자를 제거한 이름
console.log(path.dirname(__filename)); // 경로
console.log(path.extname(__filename)); // 확장자
console.log(path.parse("/home/user/dir/file.txt"));

const path2 = {
  root: "/",
  dir: "/home/user/dir",
  base: "file.txt",
  ext: ".txt",
  name: "file",
};
console.log(path.format(path2));
console.log(path.join("/home", "user", "dir", "file.txt"));
