var fs = require("fs");

const input = fs
  .readFileSync("./test.txt", {
    encoding: "utf-8",
    flag: "r",
  })
  .split("\r\n");

let inputExec = input.map((_) => 0);

let pointer = 0;
let acc = 0;

const readInput = (input) => {
  return input.split(" ");
};

const findAccValPart1 = (input) => {
  while (true) {
    if (inputExec[pointer] === 0) {
      inputExec[pointer] = 1;
    } else {
      console.log(acc, "noo");
      acc = 0;
      pointer = 0;
      inputExec = input.map((_) => 0);
      return false;
    }
    // const instruction = readInput(input[pointer]);
    let instruction = input[pointer];
    switch (instruction[0]) {
      case "nop":
        pointer += 1;
        break;
      case "acc":
        acc += parseInt(instruction[1]);
        pointer += 1;
        if (pointer === input.length) {
          console.log(acc, "yes");
          acc = 0;
          pointer = 0;
          inputExec = input.map((_) => 0);
          return false;
        }
        break;
      case "jmp":
        pointer += parseInt(instruction[1]);
        break;
    }
  }
};

const origIns = input.map((i) => readInput(i));
let alterIns = origIns;

for (let i = 0; i < origIns.length; i++) {
  if (alterIns[i][0] === "jmp") {
    alterIns[i][0] = "nop";
    if (findAccValPart1(alterIns) === true) {
      break;
    }
    alterIns[i][0] = "jmp";
  } else if (alterIns[i][0] === "nop") {
    alterIns[i][0] = "jmp";
    if (findAccValPart1(alterIns) === true) {
      break;
    }
    alterIns[i][0] = "nop";
  }
}
