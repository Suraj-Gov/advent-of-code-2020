var fs = require("fs");

const input = fs
  .readFileSync("./input.txt", {
    encoding: "utf-8",
    flag: "r",
  })
  .split("\r\n")
  .map((i) => parseInt(i));

const checkValidity = (num, pos) => {
  return input.slice(pos - 25, pos).some((firstNum, pos, arr) => {
    return arr.some((secondNum) => {
      if (firstNum + secondNum === num) {
        return true;
      }
    });
  });
};

const getContiguousNums = (sumNum, pos) => {
  let offset = 0;
  let sum = 0;
  let sumArr = [];
  while (true) {
    for (let i = offset; i < pos; i++) {
      sum += input[i];
      sumArr.push(input[i]);
      if (sum === sumNum) {
        break;
      }
      if (sum > sumNum) {
        offset++;
        sum = 0;
        sumArr = [];
        break;
      }
    }
    if (sum === sumNum) {
      break;
    }
  }
  const smallestNum = sumArr.sort((a, b) => a - b)[0];
  const largestNum = sumArr.sort((a, b) => a - b).slice(-1)[0];
  console.log(smallestNum + largestNum);
};

input.slice(25).forEach((num, pos) => {
  const isValid = checkValidity(num, pos + 25);
  if (!isValid) {
    console.log(num);
    getContiguousNums(num, pos + 25);
  }
});
