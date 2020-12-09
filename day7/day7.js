var fs = require("fs");

const input = fs
  .readFileSync("./input.txt", {
    encoding: "utf-8",
    flag: "r",
  })
  .split(".\r\n");

const obj = {};

const cleanInput = (input) => {
  const wholeInput = input.split(" contain ");
  const container = wholeInput[0].replace(" bags", "");
  // input[0] has lum color bag
  // input[1 onwards] has x lum color bag, x lum color bag...
  const contents = wholeInput[1].split(", ").map((i) => {
    return i.replace(" bags", "").replace(" bag", "");
  });
  return {
    container,
    contents,
  };
};

input.forEach((i) => {
  const output = cleanInput(i);
  obj[output.container] = output.contents;
});

let bags = ["shiny gold"];

console.log(obj);

// for (let b = 0; b < bags.length; b++) {
//   // for every bag in the bags array
//   Object.entries(obj).forEach((objArr) => {
//     // go through the generated object from input
//     if (objArr[1].some((i) => i === bags[b])) {
//       // if the container's contents have a shiny gold bag or any other bag from bags
//       bags.push(objArr[0]);
//       // push that container
//     }
//   });
// }
// console.log(Array.from(new Set(bags)).length - 1);

// part 2 is 🙄😐
