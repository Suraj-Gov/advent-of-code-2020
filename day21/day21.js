var fs = require("fs");

const input = fs
  .readFileSync("./test.txt", {
    encoding: "utf-8",
    flag: "r",
  })
  .split("\r\n")
  .map((i) => {
    const ins = i
      .split(" (contains ")
      .map((i, pos) => (pos === 1 ? i.slice(0, -1).split(", ") : i.split(" ")));
    return ins;
  });

const allergens = [].concat
  .apply(
    [],
    input.map((i) => i[1])
  )
  .filter((i, pos, arr) => arr.indexOf(i) === pos);

const allergenMap = new Map();

input.forEach((food) => {
  if (food[1].length === 1) {
    allergenMap[food[1][0]] = food[0];
  }
});

const translatedAllergenMap = new Map();

const compareAndFindAllergen = (food) => {
  Object.entries(allergenMap).some((al) => {
    const key = al[0];
    const val = al[1];
    food.some((ing) => {
      val.some((ingv) => {
        if (ingv === ing && translatedAllergenMap[ing] === undefined) {
          translatedAllergenMap[ing] = key;
          return true;
        }
      }) && true;
    });
  });
};

input.forEach((food) => {
  if (food[1].length > 1) {
    compareAndFindAllergen(food[0]);
  }
});

let safeIngredientsCount = 0;

input.forEach((ings) => {
  ings[0].forEach((ing) => {
    if (translatedAllergenMap[ing] === undefined) {
      safeIngredientsCount++;
    }
  });
});

console.log(translatedAllergenMap);

// it doesn't work for unlisted allergens 😢
