require("dotenv").config({ path: "./mysql/.env.test" });
const mysql = require("./mysql");
const xlsx = require("xlsx");

const getData = async () => {
  const salariesList = await mysql.query("salariesList");
  // console.log(salariesList);
  return salariesList;
};

const createXlsx = async () => {
  const workbook = xlsx.utils.book_new();
  const salariesList = await getData();
  const firstSheet = xlsx.utils.json_to_sheet(salariesList, {
    header: ["salary", "emp_no", "from_date", "to_date"],
    skipHeader: false,
  });
  firstSheet["!cols"] = [
    { wpx: 100 }, // 컬럼의 넓이
    { wpx: 100 },
    { wpx: 200 },
    { wpx: 200 },
  ];
  xlsx.utils.book_append_sheet(workbook, firstSheet, "Product Category");
  xlsx.writeFile(workbook, "./xlsx/salary.xlsx");
};

createXlsx();
