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
