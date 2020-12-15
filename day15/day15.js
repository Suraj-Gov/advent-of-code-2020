const formatInput = (input) => {
  return input.split(",").map((i) => parseInt(i));
};

const input = formatInput("14,3,1,0,9,5");
const testInput = formatInput("0,3,6");

// part 1
// let turn = -1;
// let numbers = [];

// const isSpokenEarlier = (num) => {
//   return numbers.slice(0, -1).filter((i) => i === num).length;
// };

// const getLastTurn = (num) => {
//   return (
//     numbers
//       .slice(0, -1)
//       .map((i, pos, arr) => (i === num ? pos : -1))
//       .filter((i) => i !== -1)
//       .slice(-1)[0] + 1
//   );
// };
// // 30000001

// while (turn < 1000) {
//   turn++;
//   if (input[turn] !== undefined) {
//     numbers.push(input[turn]);
//   } else {
//     const latestNum = numbers.slice(-1)[0];
//     if (isSpokenEarlier(latestNum) > 0) {
//       const currTurn = turn;
//       const lastTurn = getLastTurn(latestNum);
//       numbers.push(currTurn - lastTurn);
//     } else numbers.push(0);
//   }
// }

// console.log(numbers.slice(-3)[0]);

// part2

let turn = -1;
let numMap = new Map();
let numArr = [];

// 30000001

while (turn < 30000001) {
  turn++;
  if (input[turn] !== undefined) {
    numMap[input[turn]] = {
      pos: [-1, numArr.length],
      occurance: 1,
    };
    numArr.push(input[turn]);
  } else {
    const latestNum = numArr.slice(-1)[0];
    if (numMap[`${latestNum}`].occurance > 1) {
      const currTurn = turn;
      const lastTurn = numMap[`${latestNum}`].pos[0] + 1;
      const x = currTurn - lastTurn;
      let xKey = numMap[x];
      if (xKey === undefined) {
        xKey = {
          pos: [-1, numArr.length],
          occurance: 1,
        };
      } else {
        xKey = {
          pos: [xKey.pos[1], numArr.length],
          occurance: xKey.occurance + 1,
        };
      }
      numMap[x] = xKey;
      numArr.push(x);
    } else {
      numMap[0] = {
        pos: [numMap[0].pos[1], numArr.length],
        occurance: numMap[0].occurance + 1,
      };

      numArr.push(0);
    }
  }
}

console.log(numArr.slice(-5));
// 30000001st element is 1065
// executed in 840 seconds :P
