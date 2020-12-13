var fs = require("fs");

const input = fs
  .readFileSync("./input.txt", {
    encoding: "utf-8",
    flag: "r",
  })
  .split("\r\n");

const size = input.length;

const checkBounds = (r, c) => {
  return r < 0 || r >= size || c < 0 || c >= size ? true : false;
};

const top = (arr, r, c, opt) => {
  const returnVal = r > 0 ? arr[r - 1][c] : false;
  if (returnVal === ".") {
    return top(arr, r - 1, c, opt);
  } else return returnVal === opt;
};

const bottom = (arr, r, c, opt) => {
  const returnVal = r < size - 1 ? arr[r + 1][c] : false;
  if (returnVal === ".") {
    return bottom(arr, r + 1, c, opt);
  } else return returnVal === opt;
};

const left = (arr, r, c, opt) => {
  const returnVal = c > 0 ? arr[r][c - 1] : false;
  if (returnVal !== ".") {
    return returnVal === opt;
  } else return left(arr, r, c - 1, opt);
};

const right = (arr, r, c, opt) => {
  const returnVal = c < size - 1 ? arr[r][c + 1] : false;
  if (returnVal === ".") {
    return right(arr, r, c + 1, opt);
  } else return returnVal === opt;
};

const topLeft = (arr, r, c, opt) => {
  const returnVal = r > 0 && c > 0 ? arr[r - 1][c - 1] : false;
  if (returnVal === ".") {
    return topLeft(arr, r - 1, c - 1, opt);
  } else return returnVal === opt;
};

const topRight = (arr, r, c, opt) => {
  const returnVal = r > 0 && c < size - 1 ? arr[r - 1][c + 1] : false;
  if (returnVal === ".") {
    return topRight(arr, r - 1, c + 1, opt);
  } else return returnVal === opt;
};

const bottomLeft = (arr, r, c, opt) => {
  const returnVal = r < size - 1 && c > 0 ? arr[r + 1][c - 1] : false;
  if (returnVal === ".") {
    return bottomLeft(arr, r + 1, c - 1, opt);
  } else return returnVal === opt;
};

const bottomRight = (arr, r, c, opt) => {
  const returnVal = r < size - 1 && c < size - 1 ? arr[r + 1][c + 1] : false;
  if (returnVal === ".") {
    return bottomRight(arr, r + 1, c + 1, opt);
  } else return returnVal === opt;
};

const eval = (arr, r, c, opt) => {
  let count = 0;
  top(arr, r, c, opt) && count++;
  bottom(arr, r, c, opt) && count++;
  left(arr, r, c, opt) && count++;
  right(arr, r, c, opt) && count++;
  topLeft(arr, r, c, opt) && count++;
  topRight(arr, r, c, opt) && count++;
  bottomLeft(arr, r, c, opt) && count++;
  bottomRight(arr, r, c, opt) && count++;
  return count;
};

const replaceAt = (ori, rep, idx) => {
  return ori.substr(0, idx) + rep + ori.substr(idx + 1);
};

let arr = input;
let newArr = [];

let countOfOccupiedSeats = -1;
while (true) {
  for (let r = 0; r < size; r++) {
    newArr.push("");
    for (let c = 0; c < size; c++) {
      const stat = arr[r][c];
      if (stat === ".") {
        newArr[r] = newArr[r] + ".";
        continue;
      }
      if (stat === "L") {
        if (eval(arr, r, c, "#") === 0) {
          newArr[r] = newArr[r] + "#";
        } else newArr[r] += "L";
      } else if (stat === "#") {
        if (eval(arr, r, c, "#") >= 5) {
          newArr[r] = newArr[r] + "L";
        } else newArr[r] += "#";
      }
    }
  }
  console.log(newArr.join("\n"));
  console.log("----------------");
  const newOccupiedSeatsCount = newArr.reduce(
    (total, row) =>
      total +
      row.split("").reduce((total, seat) => {
        const isOccupied = seat === "#" ? 1 : 0;
        return total + isOccupied;
      }, 0),
    0
  );
  if (newOccupiedSeatsCount !== countOfOccupiedSeats) {
    arr = newArr;
    newArr = [];
    countOfOccupiedSeats = newOccupiedSeatsCount;
  } else {
    console.log(newOccupiedSeatsCount);
    break;
  }
}
