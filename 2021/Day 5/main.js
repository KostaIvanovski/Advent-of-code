let fs = require("fs");
let array = fs
  .readFileSync("input.txt")
  .toString()
  .split(/\r?\n/)
  .filter((item) => item !== "");

array.forEach((_, index) => {
  array[index] = array[index].split(/\s->\s|,/);
});

console.log(findHorizontalAndVerticalLines());
let ventLinesDiagram = createDiagram();

function findHorizontalAndVerticalLines() {
  let tempArray = [];
  let counter = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i][0] === array[i][2] || array[i][1] === array[i][3]) {
      tempArray[counter] = array[i];
      counter++;
    }
  }
  return tempArray;
}

function createDiagram() {
  let diagramSize = findMaxDiagramSize();
  let diagram = [];
  for (let x = 0; x <= diagramSize[0]; x++) {
    diagram[x] = [];
    for (let y = 0; y <= diagramSize[1]; y++) {
      diagram[x][y] = 0;
    }
  }
  return diagram;
}

function findMaxDiagramSize() {
  let maxX = 0;
  let maxY = 0;
  for (i in array) {
    if (parseInt(array[i][0]) > maxX) maxX = parseInt(array[i][0]);
    if (parseInt(array[i][2]) > maxX) maxX = parseInt(array[i][2]);
    if (parseInt(array[i][1]) > maxY) maxY = parseInt(array[i][1]);
    if (parseInt(array[i][3]) > maxY) maxY = parseInt(array[i][3]);
  }
  return [maxX, maxY];
}
