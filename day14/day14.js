function convertToBinary(num) {
  let binary = 0;
  let rem = 1;
  let i = 1;
  while (num !== 0) {
    rem = num % 2;
    binary += rem * i;
    i *= 10;
    num = parseInt(num / 2);
  }
  return binary;
}

// IDK HOW TO DO DAY14!
