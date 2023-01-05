const xlsx = require("xlsx");

const workbook = xlsx.readFile("./xlsx/test.xlsx");
const firstSheetName = workbook.SheetNames[0];
const firstSheet = workbook.Sheets[firstSheetName];

console.log(firstSheet["A2"].v); // 엑셀 첫번쨰 시트의 A2 셀 값을 가져옴
firstSheet["B2"].v = "john@gmail.com"; // 이메일 주소 변경
firstSheet["A3"] = { t: "s", v: "Janey Doe" };
firstSheet["B3"] = { t: "s", v: "janey@gmail.com" };
firstSheet["C3"] = { t: "s", v: "010-1111-1111" };
xlsx.writeFile(workbook, "./xlsx/test2.xlsx");
