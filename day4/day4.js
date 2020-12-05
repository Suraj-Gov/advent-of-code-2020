var fs = require("fs");
const { cpuUsage } = require("process");

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
// iyr:2011 ecl:brn hgt:59in`.split("\r\n\r\n");

const cleanInput = (input) => {
  const cleaned = input.split("\r\n").join(" ").split(" ");
  return cleaned;
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

const validHeight = (height) => {
  const unit = height.slice(-2);
  const val = parseInt(height.slice(0, -2));
  if (unit === "cm") {
    return val >= 150 && val <= 193;
  } else if (unit === "in") {
    return val >= 59 && val <= 76;
  } else return false;
};

const validHair = (hair) => {
  if (hair[0] === "#") {
    const regex = /[0-9a-f]/g;
    if (regex.exec(hair.slice(1).length === 6)) {
      return true;
    } else return false;
  } else return false;
};

const validEye = (eye) => {
  const validEyes = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
  return validEyes.some((i) => i === eye);
};

const validPassport = (passport) => {
  if (passport.length === 9) {
    const len = passport
      .split("")
      .reduce(
        (total, curr) => (/[0-9]/gi.exec(curr).length > 0 ? total + 1 : total),
        0
      );
    // len.forEach((i) => console.log(/[0-9]/gi.exec(i)));
    return len === 9;
  } else return false;
};

const isValidPassport = (inputObj) => {
  if (
    Object.keys(inputObj).length === 8 ||
    (Object.keys(inputObj).length === 7 && inputObj.cid === undefined)
  ) {
    const validByr = validAttr(inputObj.byr, 1920, 2002);
    const validIyr = validAttr(inputObj.iyr, 2010, 2020);
    const validEyr = validAttr(inputObj.eyr, 2020, 2030);
    const validHgt = validHeight(inputObj.hgt);
    const validHcl = validHair(inputObj.hcl);
    const validEcl = validEye(inputObj.ecl);
    const validPid = validPassport(inputObj.pid);
    return (
      validByr &&
      validIyr &&
      validEyr &&
      validHgt &&
      validHcl &&
      validEcl &&
      validPid
    );
  }
};

const validPassportCount = input.reduce((total, i) => {
  return isValidPassport(validateInput(cleanInput(i))) ? total + 1 : total;
}, 0);
console.log(validPassportCount);
