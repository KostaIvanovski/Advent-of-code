// =========================================================== //
//                    Advent of code 2021                      //
//                           Day 5                             //
// =========================================================== //

let fs = require("fs");
let array = fs
  .readFileSync("input.txt")
  .toString()
  .split(/\r?\n/)
  .filter((item) => item !== "");

array.forEach((_, index) => {
  array[index] = array[index].split(/\s->\s|,/);
});

// The diagram has the following directions:
// ---------->  direction X
// |
// |
// |
// V
//
// direction Y
let ventLinesDiagram = createDiagram();
placeLinesOnDiagram();

// PART 1
console.log("The number of overlapping vent lines is:");
console.log(countSpotsWhereLinesOverlap(ventLinesDiagram));

function countSpotsWhereLinesOverlap(diagram) {
  let counter = 0;
  for (let i = 0; i < diagram.length; i++) {
    for (let j = 0; j < diagram[i].length; j++) {
      if (diagram[i][j] > 1) counter++;
    }
  }
  return counter;
}

function placeLinesOnDiagram() {
  let lineData = getLineData();
  for (let i = 0; i < lineData.length; i++) {
    let posX = lineData[i][0];
    let posY = lineData[i][1];
    let numberOfPointsToMove = lineData[i][2];
    let direction = lineData[i][3];
    if (direction == "x") {
      for (let j = 0; j <= numberOfPointsToMove; j++) {
        ventLinesDiagram[posY][posX]++;
        posX++;
      }
    } else {
      for (let j = 0; j <= numberOfPointsToMove; j++) {
        ventLinesDiagram[posY][posX]++;
        posY++;
      }
    }
  }
}

function getLineData() {
  let xyLines = findHorizontalAndVerticalLines();
  let dataForLines = [];
  for (let i = 0; i < xyLines.length; i++) {
    let numberOfPointsToMove = 0;
    let positionX = 0;
    let positionY = 0;
    let direction = "";
    if (xyLines[i][0] == xyLines[i][2]) {
      direction = "y";
      positionX = parseInt(xyLines[i][0]);
      if (parseInt(xyLines[i][1]) >= parseInt(xyLines[i][3])) {
        positionY = xyLines[i][3];
        numberOfPointsToMove += parseInt(xyLines[i][1]) - parseInt(xyLines[i][3]);
      } else {
        positionY = xyLines[i][1];
        numberOfPointsToMove += parseInt(xyLines[i][3]) - parseInt(xyLines[i][1]);
      }
    } else {
      direction = "x";
      positionY = parseInt(xyLines[i][1]);
      if (parseInt(xyLines[i][0]) >= parseInt(xyLines[i][2])) {
        positionX = xyLines[i][2];
        numberOfPointsToMove += parseInt(xyLines[i][0]) - parseInt(xyLines[i][2]);
      } else {
        positionX = xyLines[i][0];
        numberOfPointsToMove += parseInt(xyLines[i][2]) - parseInt(xyLines[i][0]);
      }
    }
    dataForLines.push([parseInt(positionX), parseInt(positionY), numberOfPointsToMove, direction]);
  }
  return dataForLines;
}

// Returns array of arrays for positions of: [[x1,y1,x2,y2]]
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
  for (let y = 0; y <= diagramSize[1]; y++) {
    diagram[y] = [];
    for (let x = 0; x <= diagramSize[0]; x++) {
      diagram[y][x] = 0;
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
