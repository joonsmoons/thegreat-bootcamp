const drinks = [
  { id: 1, name: "코카콜라", price: 700, quantity: 5 },
  { id: 2, name: "오렌지 주스", price: 1200, quantity: 5 },
  { id: 3, name: "커피", price: 500, quantity: 5 },
  { id: 4, name: "물", price: 700, quantity: 5 },
  { id: 5, name: "옥수수수염차", price: 1200, quantity: 5 },
  { id: 6, name: "밀키스", price: 700, quantity: 5 },
  { id: 7, name: "트래비", price: 1000, quantity: 5 },
];
const drinkContainer = document.querySelector(".drinks");
for (let drink of drinks) {
  const drinkElement = document.createElement("div");
  drinkContainer.appendChild(drinkElement);
  drinkElement.className = "drink";
  drinkElement.id = drink.id;
  drinkElement.innerText = `${drink.name}\n${drink.price}`;
}

class VendingMachine {
  constructor({}) {
    this.insertedMoney;
  }
}

// const insertedMoney = { 100: 0, 500: 0, 1000: 0 };
// insertedMoney.prototype.getTotal = function () {
//   return this["100"] * 100 + this["500"] * 500 + this["1000"] * 1000;
// };
// const changeChecker = () => {};

const output = document.querySelector(".output");
const vendingBalanceElement = document.querySelector(".vending-balance");
let vendingBalance = 0;

document.addEventListener("click", (e) => {
  if (e.target.className === "coin") {
    console.log(e.target);
    const insertAmount = parseInt(e.target.innerText);
    output.innerText = `inserted coin: ${insertAmount}`;
    vendingBalance += parseInt(insertAmount);
    // insertedMoney[insertAmount] += 1;
    vendingBalanceElement.innerText = `${vendingBalance} (+${insertAmount})`;
  }
  if (e.target.className === "drink") {
    // if (vendingBalance < )
    // const insertAmount = e.target.id;
    const selectedDrink = drinks.find(
      (drink) => drink.id === parseInt(e.target.id)
    );
    if (vendingBalance < selectedDrink.price) {
      output.innerText = "NOT ENOUGH BALANCE!";
    } else {
      vendingBalance -= selectedDrink.price;
      vendingBalanceElement.innerText = `${vendingBalance} (-${selectedDrink.price})`;
    }
  }
});

const vendingMachineChange = { 1000: 0, 500: 0, 100: 10 };
