const formatInput = (input) => {
  return input.split(",").map((i) => parseInt(i));
};

const input = formatInput("14,3,1,0,9,5");
const testInput = formatInput("3,1,2");

let turn = -1;
let numbers = [];

const isSpokenEarlier = (num) => {
  return numbers.slice(0, -1).filter((i) => i === num).length;
};

const getLastTurn = (num) => {
  return (
    numbers
      .slice(0, -1)
      .map((i, pos, arr) => (i === num ? pos : -1))
      .filter((i) => i !== -1)
      .slice(-1)[0] + 1
  );
};
// 30000001

while (turn < 1000) {
  turn++;
  if (input[turn] !== undefined) {
    numbers.push(input[turn]);
  } else {
    const latestNum = numbers.slice(-1)[0];
    if (isSpokenEarlier(latestNum) > 0) {
      const currTurn = turn;
      const lastTurn = getLastTurn(latestNum);
      numbers.push(currTurn - lastTurn);
    } else numbers.push(0);
  }
}

console.log(numbers.slice(-3)[0]);
