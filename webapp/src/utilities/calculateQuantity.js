export default function calculateQuantity(list) {
  if (list.length === 0) {
    return list;
  }
  let items = new Set(list.map((val) => val._id));
  items = Array.from(items);

  let output = items.map((val1, index) => {
    let collection = list.filter((obj) => val1 === obj._id);
    let count = collection.length;
    return { ...{ _id: val1, quantity: count }, ...collection[0] };
  });

  return output;
}
