const inputNum = "916438275";
const testNum = "389125467";

const input = inputNum.split("").map(Number);

let moveCounter = 1;
let currCupPos = 0;
let cupCircle = input;

const findDest = (remainingCups) => {
  let dest = cupCircle[currCupPos] - 1;
  if (dest === 0) {
    dest = 9;
  }
  while (true) {
    if (remainingCups.includes(dest)) {
      return dest;
    } else {
      dest === 0 ? (dest = 9) : dest--;
    }
  }
};

const getRemainingCups = (removedCups) => {
  return cupCircle.filter((i) => !removedCups.includes(i));
};

const pushThreeCups = (remainingCups, destPos, threeCups) => {
  return remainingCups.reduce((retArr, currEl, idx) => {
    if (idx === destPos) {
      // this line ☝
      return [...retArr, currEl, ...threeCups];
    } else return [...retArr, currEl];
  }, []);
};

const getNextThreeCups = (currCupPos) => {
  const returnArr = [];
  for (let i = 1; i <= 3; i++) {
    const pos = (currCupPos + i) % cupCircle.length;
    returnArr.push(cupCircle[pos]);
  }
  return returnArr;
};

const reorderCupCircle = (theNextCurr, theNextCurrPos) => {
  let returnArr = cupCircle;
  while (true) {
    const lastEl = returnArr.pop();
    returnArr.unshift(lastEl);
    if (returnArr[theNextCurrPos] === theNextCurr) {
      return returnArr;
    }
  }
};

while (moveCounter <= 100) {
  moveCounter++;
  const theNext = cupCircle[(currCupPos + 4) % cupCircle.length];
  const threeCups = getNextThreeCups(currCupPos);
  const remainingCups = getRemainingCups(threeCups);
  let dest = findDest(remainingCups);
  const destPos = remainingCups.indexOf(dest);
  cupCircle = pushThreeCups(remainingCups, destPos, threeCups);
  cupCircle = reorderCupCircle(theNext, (moveCounter - 1) % cupCircle.length);
  console.log(cupCircle);
  currCupPos = (currCupPos + 1) % cupCircle.length;
}
