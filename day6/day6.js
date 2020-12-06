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
  return separatedInputs.slice(2, 3).reduce((total, group) => {
    let questions = {};
    let groupQuestionCount = group.reduce((total, question) => {
      question.split("").forEach((q) => {
        if (questions[q] === undefined) {
          questions[q] = 1;
        } else questions[q] += 1;
      });
      const totalMembers = question.split("").length;

      const x = Object.entries(questions).reduce(
        (totalCommonQuestions, question) => {
          return question[1] === totalMembers
            ? totalCommonQuestions + 1
            : totalCommonQuestions;
        },
        0
      );
      return total + x;
    }, 0);
    total = total + groupQuestionCount;
    questions = {};
    return total;
  }, 0);
};

console.log(countCommonYesQuestions());
