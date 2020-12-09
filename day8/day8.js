var fs = require("fs");

const input = fs
  .readFileSync("./input.txt", {
    encoding: "utf-8",
    flag: "r",
  })
  .split("\r\n");

const inputExec = input.map((_) => 0);

let pointer = 0;
let acc = 0;

const readInput = (input) => {
  return input.split(" ");
};

while (true) {
  if (inputExec[pointer] === 0) {
    inputExec[pointer] = 1;
  } else break;
  const instruction = readInput(input[pointer]);
  switch (instruction[0]) {
    case "nop":
      pointer += 1;
      break;
    case "acc":
      acc += parseInt(instruction[1]);
      pointer += 1;
      break;
    case "jmp":
      pointer += parseInt(instruction[1]);
      break;
  }
}

console.log(acc);
