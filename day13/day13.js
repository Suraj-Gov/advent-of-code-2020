var fs = require("fs");
const { off } = require("process");

const input = fs
  .readFileSync("./test.txt", {
    encoding: "utf-8",
    flag: "r",
  })
  .split("\r\n");

const inputTimestamp = parseInt(input[0]);
const inputBusIDArr = input[1]
  .split(",")
  .filter((i) => i !== "x")
  .map((i) => parseInt(i));

let time = inputTimestamp;

// part1
// while (true) {
//   const busAvailable = inputBusIDArr.filter((i) => time % i === 0);
//   if (busAvailable.length > 0) {
//     console.log(busAvailable);
//     console.log(Math.abs(time - inputTimestamp) * busAvailable[0]);
//     break;
//   } else time++;
// }

// part2

const isInRange = (num, min, max) => {
  return num >= min && num <= max;
};

const offset = inputBusIDArr.sort((a, b) => a - b)[0];
let minTime = 1;
let maxTime = offset;

while (true) {
  let busArr = [];
  for (i = minTime; i <= maxTime; i++) {
    inputBusIDArr.forEach((id) => {
      if (
        isInRange(i, minTime, maxTime) &&
        i % id === 0 &&
        !busArr.includes(id)
      ) {
        busArr.push(id);
      }
    });
  }
  if (inputBusIDArr.every((j, pos) => busArr.indexOf(j) === pos)) {
    console.log(minTime);
    console.log({ busArr, inputBusIDArr });
    break;
  }
  minTime = maxTime;
  maxTime = maxTime + offset;
  busArr = [];
}
