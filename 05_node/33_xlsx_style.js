const express = require("express");
const app = express();
app.use(express.json({ limit: "50mb" }));

//  xlsx-js-style

const xlsx = require("xlsx-js-style");
const createXlsx = async () => {
  const workbook = xlsx.utils.book_new();
  const customers = [
    { name: "고객명", email: "이메일", phone: "연락처" },
    { name: "유재석", email: "ryu@gmail.com", phone: "010-0000-0000" },
    { name: "김종국", email: "kim@gmail.com", phone: "010-0000-0001" },
    { name: "송지효", email: "song@gmail.com", phone: "010-0000-0002" },
  ];
  const firstSheet = xlsx.utils.json_to_sheet(customers, {
    header: ["name", "email", "phone"],
    skipHeader: true,
  });
  firstSheet["!cols"] = [{ wpx: 120 }, { wpx: 200 }, { wpx: 200 }];
  firstSheet["A1"].s = {
    font: {
      name: "Calibri",
      sz: 24,
      bold: true,
      color: { rgb: "FF0000" },
      italic: true,
      strike: true,
      underline: false,
    },
  };
  firstSheet["B1"].s = {
    alignment: {
      vertical: "center", // top, center, bottom
      horizontal: "center", // left, center, right
      wrapText: true, // 다음줄로 넘어감
      textRotation: 90,
    },
  };
  firstSheet["C1"].s = {
    border: {
      // top, bottom, left, right
      top: {
        style: "thick", // dashDotDot, dashDot, dashed, dotted, medium, thick, thin
        color: { rgb: "FF0000" },
      },
      left: {
        style: "thick", // dashDotDot, dashDot, dashed, dotted, medium, thick, thin
        color: { rgb: "FF0000" },
      },
      bottom: {
        style: "thick", // dashDotDot, dashDot, dashed, dotted, medium, thick, thin
        color: { rgb: "FF0000" },
      },
      right: {
        style: "thick", // dashDotDot, dashDot, dashed, dotted, medium, thick, thin
        color: { rgb: "00FF00" },
      },
    },
  };
  firstSheet["A2"].s = {
    fill: {
      patternType: "solid",
      fgColor: { rgb: "FF0000" },
      bgColor: { rgb: "00FF00" },
    },
  };
  xlsx.utils.book_append_sheet(workbook, firstSheet, "Customers");
  xlsx.writeFile(workbook, "./xlsx/customer_styled.xlsx");
};

createXlsx();
