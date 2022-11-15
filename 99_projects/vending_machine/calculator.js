/**
 * Returns the total sum of all coins inside the coin balance.
 *
 * @param {object} wallet The object containing quantity for each coin type.
 * @returns {number} Total sum of all coin types.
 */
function calculateBalance(wallet) {
  let total = 0;
  for (let key in wallet) {
    total += wallet[key] * parseInt(key);
  }
  return total;
}

/**
 *
 * @param {} balance
 * @param {*} changeAmount
 * @returns
 */
function calculateChange(wallet, changeAmount) {
  let currentIndex = 0;
  let options = Object.keys(wallet);
  const newWallet = { ...wallet };
  options.sort((a, b) => b - a);
  // run greedy change generator algorithm
  const change = {};
  while (changeAmount > 0 && currentIndex < options.length) {
    const optionAmount = parseInt(options[currentIndex]);
    if (newWallet[options[currentIndex]] > 0 && changeAmount >= optionAmount) {
      //   console.log(`${changeAmount} subtracted ${optionAmount}`);
      changeAmount -= optionAmount;
      newWallet[options[currentIndex]] -= 1;
      if (!(options[currentIndex] in change)) {
        change[options[currentIndex]] = 0; // initialize if not exists
      }
      change[options[currentIndex]] += 1;
    } else {
      currentIndex++;
    }
  }
  if (changeAmount !== 0) {
    return { status: 501 };
  } else {
    return { status: 200, change, wallet: newWallet };
  }
}

export { calculateBalance, calculateChange };
