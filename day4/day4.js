var fs = require("fs");

const input = fs
  .readFileSync("./input.txt", {
    encoding: "utf-8",
    flag: "r",
  })
  .split("\r\n\r\n");

// const input = `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
// byr:1937 iyr:2017 cid:147 hgt:183cm

// iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
// hcl:#cfa07d byr:1929

// hcl:#ae17e1 iyr:2013
// eyr:2024
// ecl:brn pid:760753108 byr:1931
// hgt:179cm

// hcl:#cfa07d eyr:2025 pid:166559648
// iyr:2011 ecl:brn hgt:59in`.split("\n\n");

const cleanInput = (input) => {
  return input.split("\n").join(" ").slice(0, -1).split(" ");
};

const validateInput = (input) => {
  const inputObj = {};
  input.forEach((i) => {
    const details = i.split(":");
    inputObj[details[0]] = details[1];
  });
  // console.log(inputObj);
  return inputObj;
};

const validAttr = (inputObjAttr, limit1, limit2) => {
  return (
    inputObjAttr.length === 4 &&
    parseInt(inputObjAttr) >= limit1 &&
    parseInt(inputObjAttr) <= limit2
  );
};

const validHeight = (height = {
  // todo
});

const isValidPassport = (inputObj) => {
  if (
    Object.keys(inputObj).length === 8 ||
    (Object.keys(inputObj).length === 7 && inputObj.cid === undefined)
  ) {
    const validByr = validAttr(inputObj.byr, 1920, 2002);
    const validIyr = validAttr(inputObj.iyr, 2010, 2020);
    const validEyr = validAttr(inputObj.eyr, 2020, 2030);
  }
};

const validPassportCount = input.reduce((total, i) => {
  return isValidPassport(validateInput(cleanInput(i))) ? total + 1 : total;
}, 0);
console.log(validPassportCount);
