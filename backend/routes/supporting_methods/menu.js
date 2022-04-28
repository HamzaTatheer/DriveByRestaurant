getHighestOrderItem = (orders) => {
  items = [];
  orders.map((elem) => {
    let food_items = elem.fooditems;
    food_items.map((item) => {
      items.push(item._id);
    });
  });
  items.sort();

  let count = {};
  items.forEach(function (i) {
    count[i] = (count[i] || 0) + 1;
  });

  return Object.keys(count).reduce((a, b) => (count[a] > count[b] ? a : b));
};

module.exports = { getHighestOrderItem };
