var fs = require("fs");

const input = fs
  .readFileSync("./input.txt", {
    encoding: "utf-8",
    flag: "r",
  })
  .split("\r\n")
  .map((i) => i.trim());

// console.log(input[0].length);

// const input = `..##.......
// #...#...#..
// .#....#..#.
// ..#.#...#.#
// .#...##..#.
// ..#.##.....
// .#.#.#....#
// .#........#
// #.##...#...
// #...##....#
// .#..#...#.#`
//   .split("\n")
//   .map((i) => i.trim());

let point = {
  r: 0,
  c: 0,
};
let trees = 0;
const boundx = input[0].length;
const boundy = input.length;

const slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

const treesEncounteredOnEachSlope = [];

for (let i = 0; i < slopes.length; i++) {
  while (point.c < boundy - 1) {
    point.r = (point.r + slopes[i][0]) % boundx;
    point.c = point.c + slopes[i][1];
    if (input[point.c][point.r] === "#") {
      trees++;
    }
  }
  treesEncounteredOnEachSlope.push(trees);
  trees = 0;
  point.r = 0;
  point.c = 0;
}

console.log(
  treesEncounteredOnEachSlope.reduce((total, curr) => {
    return total * curr;
  }, 1)
);
