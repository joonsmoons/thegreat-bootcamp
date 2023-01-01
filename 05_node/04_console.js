const fs = require("fs");
const { Console } = require("console");
const output = fs.createWriteStream("./stdout.log");
const errorOutput = fs.createWriteStream("./stderr.log");
const logger = new Console({ stdout: output, stderr: errorOutput });
logger.log("[SUCCESS] output is printed to the console.");
logger.error("[ERROR] some error occurred!");

console.log("Hello World!");
const world = "world";
console.log(`Hello ${world}`);

console.error("에러 메시지 출력");
console.error(new Error("에러 메시지 출력"));

const arr = [
  {
    name: "John Doe",
    email: "john@gmail.com",
    phone: "000-1234-1231",
    company: "Company A",
  },
  {
    name: "Jane Doe",
    email: "jane@gmail.com",
    phone: "000-1231-2444",
    company: "Company B",
  },
  {
    name: "Doe Doe",
    email: "doe@gmail.com",
    phone: "000-1234-4321",
    company: "Company C",
  },
];
console.log(arr);
// [
//   {
//     name: 'John Doe',
//     email: 'john@gmail.com',
//     phone: '000-1234-1231',
//     company: 'Company A'
//   },
//   {
//     name: 'Jane Doe',
//     email: 'jane@gmail.com',
//     phone: '000-1231-2444',
//     company: 'Company B'
//   }
//  ...
// ]
console.table(arr);
// ┌─────────┬────────────┬──────────────────┬─────────────────┬─────────────┐
// │ (index) │    name    │      email       │      phone      │   company   │
// ├─────────┼────────────┼──────────────────┼─────────────────┼─────────────┤
// │    0    │ 'John Doe' │ 'john@gmail.com' │ '000-1234-1231' │ 'Company A' │
// │    1    │ 'Jane Doe' │ 'jane@gmail.com' │ '000-1231-2444' │ 'Company B' │
// │    2    │ 'Doe Doe'  │ 'doe@gmail.com'  │ '000-1234-4321' │ 'Company C' │
// └─────────┴────────────┴──────────────────┴─────────────────┴─────────────┘

const obj = {
  students: {
    grade1: { class1: {}, class2: {} },
    grade2: { class1: {}, class2: {} },
    grade3: { class1: {}, class2: {} },
    grade4: { class1: {}, class2: {} },
    grade5: { class1: {}, class2: {} },
    grade6: { class1: {}, class2: {} },
    grade7: { class1: {}, class2: {} },
    grade8: { class1: {}, class2: {} },
    teachers: ["John Doe", "Jane Doe"],
  },
};

console.log(obj);
console.dir(obj, { depth: 2, color: true });

console.time("timeHere");
for (let i = 0; i < 999999999; i++) {
  // long code
}
console.timeEnd("timeHere");
// timeHere: 525.444ms

const nested = [
  {
    id: "0001",
    type: "donut",
    name: "Cake",
    ppu: 0.55,
    batters: {
      batter: [
        { id: "1001", type: "Regular" },
        { id: "1002", type: "Chocolate" },
        { id: "1003", type: "Blueberry" },
        { id: "1004", type: "Devil's Food" },
      ],
    },
    topping: [
      { id: "5001", type: "None" },
      { id: "5002", type: "Glazed" },
      { id: "5005", type: "Sugar" },
      { id: "5007", type: "Powdered Sugar" },
      { id: "5006", type: "Chocolate with Sprinkles" },
      { id: "5003", type: "Chocolate" },
      { id: "5004", type: "Maple" },
    ],
  },
  {
    id: "0002",
    type: "donut",
    name: "Raised",
    ppu: 0.55,
    batters: {
      batter: [{ id: "1001", type: "Regular" }],
    },
    topping: [
      { id: "5001", type: "None" },
      { id: "5002", type: "Glazed" },
      { id: "5005", type: "Sugar" },
      { id: "5003", type: "Chocolate" },
      { id: "5004", type: "Maple" },
    ],
  },
  {
    id: "0003",
    type: "donut",
    name: "Old Fashioned",
    ppu: 0.55,
    batters: {
      batter: [
        { id: "1001", type: "Regular" },
        { id: "1002", type: "Chocolate" },
      ],
    },
    topping: [
      { id: "5001", type: "None" },
      { id: "5002", type: "Glazed" },
      { id: "5003", type: "Chocolate" },
      { id: "5004", type: "Maple" },
    ],
  },
];

// [
//   {
//     id: '0001',
//     type: 'donut',
//     name: 'Cake',
//     ppu: 0.55,
//     batters: { batter: [Array] },
//     topping: [
//       [Object], [Object],
//       [Object], [Object],
//       [Object], [Object],
//       [Object]
//     ]
//   },
//   {
//     id: '0002',
//     type: 'donut',
//     name: 'Raised',
//     ppu: 0.55,
//     batters: { batter: [Array] },
//     topping: [ [Object], [Object], [Object], [Object], [Object] ]
//   },
//   {
//     id: '0003',
//     type: 'donut',
//     name: 'Old Fashioned',
//     ppu: 0.55,
//     batters: { batter: [Array] },
//     topping: [ [Object], [Object], [Object], [Object] ]
//   }
// ]

// [
//   {
//     id: '0001',
//     type: 'donut',
//     name: 'Cake',
//     ppu: 0.55,
//     batters: [Object],
//     topping: [Array]
//   },
//   ...
// ]
