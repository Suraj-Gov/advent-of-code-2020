var fs = require("fs");

let input = fs.readFileSync("./input.txt", {
  encoding: "utf-8",
  flag: "r",
});

input = input.split("\n");

function inputConverter(input) {
  const inputArray = input.split(" ");
  const minMax = inputArray[0].split("-").map((e) => parseInt(e));
  const letter = inputArray[1][0];
  const passwordString = inputArray[2];
  return {
    minNum: minMax[0],
    maxNum: minMax[1],
    letter,
    passwordString,
  };
}

function validPassword(inputObj) {
  const { minNum, maxNum, letter, passwordString } = inputObj;
  const ans = passwordString.split("").reduce((total, curr) => {
    return curr === letter ? total + 1 : total;
  }, 0);
  return ans >= minNum && ans <= maxNum ? 1 : 0;
}

function tobogganCorpoValidity(inputObj) {
  const { minNum, maxNum, letter, passwordString } = inputObj;
  return passwordString[minNum - 1] === letter &&
    passwordString[maxNum - 1] === letter
    ? 0
    : passwordString[minNum - 1] === letter ||
      passwordString[maxNum - 1] === letter
    ? 1
    : 0;
}

const output = input.reduce((total, currPass) => {
  if (tobogganCorpoValidity(inputConverter(currPass)) === 1) {
    return total + 1;
  } else return total;
}, 0);
console.log(output);
