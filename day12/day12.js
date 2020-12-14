var fs = require("fs");

const input = fs
  .readFileSync("./input.txt", {
    encoding: "utf-8",
    flag: "r",
  })
  .split("\r\n");

let east = 0;
let north = 0;
let direction = 90;

const goForward = (unit) => {
  switch (direction / 90) {
    case 1:
      east += unit;
      break;
    case 2:
      north -= unit;
      break;
    case 3:
      east -= unit;
      break;
    case 0:
      north += unit;
      break;
  }
};

input.forEach((i) => {
  switch (i[0]) {
    case "N":
      north += parseInt(i.slice(1));
      break;
    case "S":
      north -= parseInt(i.slice(1));
      break;
    case "W":
      east -= parseInt(i.slice(1));
      break;
    case "E":
      east += parseInt(i.slice(1));
      break;
    case "L":
      direction = (direction - parseInt(i.slice(1))) % 360;
      break;
    case "R":
      direction = (direction + parseInt(i.slice(1))) % 360;
      break;
    case "F":
      goForward(parseInt(i.slice(1)));
      break;
  }
});

console.log({ north, east, sum: Math.abs(north) + Math.abs(east) });
