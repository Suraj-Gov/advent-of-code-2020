var fs = require("fs");

const input = fs
  .readFileSync("./input.txt", {
    encoding: "utf-8",
    flag: "r",
  })
  .split("\r\n");

const findLocation = (loc) => {
  let finalLocation = {
    row: -1,
    column: -1,
  };
  const locArr = loc.split("");
  let upperHalf = 0;
  let lowerHalf = 127;
  locArr.slice(0, -3).forEach((l) => {
    if (l === "F") {
      lowerHalf = Math.floor((upperHalf + lowerHalf) / 2);
    } else if (l === "B") {
      upperHalf = Math.round((upperHalf + lowerHalf) / 2);
    }
    if (upperHalf === lowerHalf) {
      finalLocation.row = upperHalf;
    }
  });
  lowerHalf = 0;
  upperHalf = 7;
  locArr.slice(-3).forEach((l) => {
    if (l === "R") {
      lowerHalf = Math.round((upperHalf + lowerHalf) / 2);
    } else if (l === "L") {
      upperHalf = Math.floor((upperHalf + lowerHalf) / 2);
    }
    if (lowerHalf === upperHalf) {
      finalLocation.column = lowerHalf;
    }
  });
  return {
    locArr: locArr.join(""),
    id: finalLocation.row * 8 + finalLocation.column,
  };
};

// console.log(input.map((i) => findLocation(i)).sort((a, b) => a.id - b.id));
const allInputs = input.map((i) => findLocation(i)).sort((a, b) => a.id - b.id);
// console.log(allInputs[0], allInputs.slice(-1));
console.log(allInputs.filter((i, idx) => i.id !== idx + 84)[0].id - 1);
// alternate way 👇
for (let i = 0; i < allInputs.length; i++) {
  if (allInputs[i].id !== i + 84) {
    console.log(allInputs[i - 1]);
    break;
  }
}
// idk how I got this answer, I just filtered based on the indexes,
// first seat is 84, second is 85 and so on...
// so if the first seat which didn't match the index + 84, that's the seat missing
