var fs = require("fs");


const input = fs
  .readFileSync("./input.txt", {
    encoding: "utf-8",
    flag: "r",
  })
  .split("\r\n\r\n");

const separatedInputs = input.map((i) => i.split("\r\n"));

const countQuestions = () => {
  return separatedInputs.reduce((total, group) => {
    let questions = {};
    group.forEach((question) => {
      question.split("").forEach((q) => {
        if (questions[q] === undefined) {
          questions[q] = 1;
        } else questions[q] += 1;
      });
    });
    total = total + Object.keys(questions).length;
    questions = {};
    return total;
  }, 0);
};

const countCommonYesQuestions = () => {
  let questionsMap = {};
  return separatedInputs.reduce((total, currGroup) => {
    currGroup.forEach((person) => {
      person.split("").forEach((question) => {
        if (questionsMap[question] === undefined) {
          questionsMap[question] = 1;
        } else questionsMap[question] += 1;
      });
    });
    const people = currGroup.length;
    Object.entries(questionsMap).forEach((question) => {
      if (question[1] === people) {
        total += 1;
      }
    });
    questionsMap = {};
    return total;
  }, 0);
};

console.log(countCommonYesQuestions());
