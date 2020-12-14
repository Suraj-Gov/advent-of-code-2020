var fs = require("fs");

const input = fs
  .readFileSync("./input.txt", {
    encoding: "utf-8",
    flag: "r",
  })
  .split("\r\n")
  .map((i) => parseInt(i));

const sortedInput = input.sort((a, b) => a - b);
let oneJolt = 0;
let twoJolt = 0;
let threeJolt = 0;
sortedInput.push(parseInt(sortedInput.slice(-1)) + 3);
sortedInput.unshift(0);

for (let i = 0; i < sortedInput.length; i++) {
  const curr = sortedInput[i];
  const next = sortedInput[i + 1];
  switch (next - curr) {
    case 1:
      oneJolt++;
      break;
    case 2:
      twoJolt++;
      break;
    case 3:
      threeJolt++;
      break;
  }
}

console.log({ oneJolt, twoJolt, threeJolt, prod: oneJolt * threeJolt });
