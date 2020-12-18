var fs = require("fs");

const input = fs
  .readFileSync("./input.txt", {
    encoding: "utf-8",
    flag: "r",
  })
  .split("\r\n")
  .map((i) =>
    i
      .split("")
      .filter((i) => i !== " ")
      .map((i) => (isNaN(i) ? i : parseInt(i)))
  );

let answers = [];

const calc = (arr) => {
  // part 1
  // let firstNum = null;
  // let secondNum = null;
  // let operation = null;
  // arr.forEach((i) => {
  //   if (typeof i === "number") {
  //     firstNum === null ? (firstNum = i) : (secondNum = i);
  //   } else {
  //     operation = i;
  //   }
  //   if (firstNum !== null && secondNum !== null) {
  //     switch (operation) {
  //       case "+":
  //         firstNum = firstNum + secondNum;
  //         break;
  //       case "*":
  //         firstNum = firstNum * secondNum;
  //         break;
  //     }
  //     secondNum = null;
  //     operation = null;
  //   }
  // });
  // return firstNum;

  // part2
  let sumOnly = arr;
  if (arr.includes("+")) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === "+") {
        const sum = arr[i - 1] + arr[i + 1];
        sumOnly[i - 1] = "X";
        sumOnly[i] = "X";
        sumOnly[i + 1] = sum;
        i = i + 1;
      } else sumOnly[i] = arr[i];
    }
  } else sumOnly = arr;
  sumOnly = sumOnly.filter((i) => i !== "X");
  let firstNum = null;
  let secondNum = null;
  sumOnly.forEach((i) => {
    if (typeof i === "number") {
      firstNum === null ? (firstNum = i) : (secondNum = i);
    } else {
      operation = i;
    }
    if (firstNum !== null && secondNum !== null) {
      firstNum = firstNum * secondNum;
    }
    secondNum = null;
    operation = null;
  });
  return firstNum;
};

input.forEach((input) => {
  let stack = [];
  let ptr = 0;

  const pushScope = () => {
    let localScope = [];
    while (input[ptr] !== ")") {
      if (input[ptr] === "(") {
        ptr++;
        localScope.push(pushScope());
      } else {
        localScope.push(input[ptr]);
        ptr++;
      }
    }
    ptr++;
    return calc(localScope);
  };

  while (ptr < input.length) {
    const el = input[ptr];
    if (typeof el === "number" || el === "+" || el === "*") {
      stack.push(el);
      ptr++;
    } else {
      ptr++;
      stack.push(pushScope());
    }
  }

  answers.push(calc(stack));
  stack = [];
});

console.log(answers.reduce((t, c) => t + c, 0));
