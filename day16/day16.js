var fs = require("fs");

const input = fs
  .readFileSync("./test.txt", {
    encoding: "utf-8",
    flag: "r",
  })
  .trim()
  .split("\r\n\r\n");

const rangeData = input[0]
  .split("\r\n")
  .map((i) => i.split(": ")[1])
  .map((i) => i.split(" or "))
  .map((i) =>
    i.map((j) => {
      return j.split("-").map(Number);
    })
  );

const rangeNames = input[0].split("\r\n").map((i) => i.split(": ")[0]);

const myTicketData = input[1].split("\r\n")[1].split(",").map(Number);

const nearbyTicketsData = input[2]
  .split("\r\n")
  .slice(1)
  .map((i) => i.split(",").map(Number));

// part1
const checkRanges = (num) => {
  return rangeData.some((range) =>
    range.some((subRange) => num >= subRange[0] && num <= subRange[1])
  );
};

const validateData = (ticket) => {
  for (let i = 0; i < ticket.length; i++) {
    const currTicket = ticket[i];
    if (!checkRanges(currTicket)) {
      return false;
    }
  }
  return true;
};

const validTickets = nearbyTicketsData.filter((i) => validateData(i));
// validTickets.unshift(myTicketData);

let ticketOrder = {};
const findField = (numArr, rowNum) => {
  let fieldValidObj = {};
  rangeNames.forEach((name) => {
    fieldValidObj[name] = 0;
  });
  for (let i = 0; i < validTickets.length; i++) {
    rangeData.forEach((rangePair, rangeType) => {
      const currNum = numArr[i];
      if (
        (rangePair[0][0] <= currNum && currNum <= rangePair[0][1]) ||
        (rangePair[1][0] <= currNum && currNum <= rangePair[1][1])
      ) {
        const currRangeName = rangeNames[rangeType];
        if (fieldValidObj[currRangeName] === undefined) {
          fieldValidObj[currRangeName] = 1;
        } else {
          const currNameCount = fieldValidObj[currRangeName];
          fieldValidObj[currRangeName] = currNameCount + 1;
        }
      }
    });
  }
  const sortedFieldVal = Object.entries(fieldValidObj)
    .filter((i) => ticketOrder[i[0]] === undefined)
    .sort((a, b) => a[1] - b[1]);
  ticketOrder[sortedFieldVal.slice(-1)[0][0]] = rowNum;
};

for (let i = 0; i < myTicketData.length; i++) {
  findField(
    validTickets.map((ticket) => ticket[i]),
    i
  );
}

console.log(ticketOrder);
// console.log(
//   myTicketData[ticketOrder["departure location"]] *
//     myTicketData[ticketOrder["departure station"]] *
//     myTicketData[ticketOrder["departure platform"]] *
//     myTicketData[ticketOrder["departure track"]] *
//     myTicketData[ticketOrder["departure time"]] *
//     myTicketData[ticketOrder["departure date"]]
// );
