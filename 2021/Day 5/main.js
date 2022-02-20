let fs = require("fs");
let array = fs
  .readFileSync("input.txt")
  .toString()
  .split(/\r?\n/)
  .filter((item) => item !== "");

console.log(array);
