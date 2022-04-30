getBill = (food_items) => {
  return food_items
    .map((obj) => obj.price)
    .reduce((prev, cur) => {
      //calculate total bill
      return prev + cur;
    });
};

module.exports = { getBill };
