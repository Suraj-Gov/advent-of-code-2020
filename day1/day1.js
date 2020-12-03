// find two entries that sum to 2020 and multiply those two.
// https://www.geeksforgeeks.org/node-js-fs-readfilesync-method/
var fs = require("fs");

const input = fs.readFileSync("input.txt", {
  encoding: "utf-8",
  flag: "r",
});

let array = input.split(",").map((e) => parseInt(e));

for (let i = 0; i < array.length; i++) {
  let firstNum = array[i];
  for (let j = 0; j < array.length; j++) {
    let secondNum = array[j];
    for (let k = 0; k < array.length; k++) {
      let thirdNum = array[k];
      if (firstNum + secondNum + thirdNum === 2020) {
        console.log({
          firstNum,
          secondNum,
          thirdNum,
          product: firstNum * secondNum * thirdNum,
        });
        return;
      }
    }
  }
}
