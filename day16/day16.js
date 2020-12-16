var fs = require("fs");

const input = fs
  .readFileSync("./input.txt", {
    encoding: "utf-8",
    flag: "r",
  })
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

const invalidValues = [];
const validateData = (ticket) => {
  for (let i = 0; i < ticket.length; i++) {
    const currTicket = ticket[i];
    if (!checkRanges(currTicket)) {
      invalidValues.push(currTicket);
    }
  }
};

nearbyTicketsData.forEach((i) => validateData(i));
console.log(invalidValues.reduce((total, curr) => total + curr, 0));
