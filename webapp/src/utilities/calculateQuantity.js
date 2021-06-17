export default function calculateQuantity(list) {
  let items = new Set(list.map((val) => val._id));
  items = Array.from(items);

  let output = items.map((val1, index) => {
    let collection = list.filter((obj) => val1 == obj._id);
    let count = collection.length;
    return { _id: val1, quantity: count, ...collection[0] };
  });

  return output;
}

let ans = calculateQuantity([
  { id: 3, name: "3143" },
  { id: 2, name: "443" },
  { id: 3, name: "3333" },
  { id: 1, name: "43" },
  { id: 4, name: "4443", df: 321 },
  { id: 4, name: "4333", df: 32 },
]);

console.log(ans);
