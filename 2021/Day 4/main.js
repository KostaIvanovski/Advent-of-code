// =========================================================== //
//                    Advent of code 2021                      //
//                           Day 4                             //
// =========================================================== //

let fs = require("fs");
let array = fs
  .readFileSync("input.txt")
  .toString()
  .split(/\r?\n/)
  .filter((item) => item !== "");

let bingoNumbersList = array.splice(0, 1);
bingoNumbersList = bingoNumbersList[0].split(",");

// bingoCardsList[Card][Row][Column]
// bingoCardsList[0][1][2] is the third number in the second row of the first bingo card
// The bingo cards are 5x5 size
let bingoCardsList = [];
for (let i = 0; i < array.length; i += 5) {
  let tempArray = [
    array[i].trim().split(/ * /),
    array[i + 1].trim().split(/ * /),
    array[i + 2].trim().split(/ * /),
    array[i + 3].trim().split(/ * /),
    array[i + 4].trim().split(/ * /),
  ];
  bingoCardsList.push(tempArray);
}
console.log("The final score of the first bingo is:");
console.log(calculateWinningBoardScore());
console.log("The final score of the last bingo is:");
console.log(calculateLastWinningBoardScore());

// Part 1 of the puzzle
function calculateWinningBoardScore() {
  let bingo = findBingoFirst();
  let sumOfUndrawnNumbers = 0;
  let card = bingo[0];
  let winningNumber = bingo[1];
  let drawnNumbers = bingo[2];
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      let drawn = false;
      for (let i = 0; i < drawnNumbers.length; i++) {
        if (parseInt(bingoCardsList[card][row][col]) === drawnNumbers[i]) drawn = true;
      }
      if (!drawn) sumOfUndrawnNumbers += parseInt(bingoCardsList[card][row][col]);
    }
  }
  return sumOfUndrawnNumbers * winningNumber;
}
// Part 2 of the puzzle
function calculateLastWinningBoardScore() {
  let bingo = findBingoLast();
  let sumOfUndrawnNumbers = 0;
  let card = bingo[0];
  let winningNumber = bingo[1];
  let drawnNumbers = bingo[2];
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      let drawn = false;
      for (let i = 0; i < drawnNumbers.length; i++) {
        if (parseInt(bingoCardsList[card][row][col]) === drawnNumbers[i]) drawn = true;
      }
      if (!drawn) sumOfUndrawnNumbers += parseInt(bingoCardsList[card][row][col]);
    }
  }
  return sumOfUndrawnNumbers * winningNumber;
}

// Returns a new array of [index of the card where the first bingo is, the winning number, array with the drawn numbers]
function findBingoFirst() {
  let drawnNumbersList = [];
  let bingoCondtionCounter = 0; // When it reaches 5 bingo is achieved

  for (let i = 0; i < bingoNumbersList.length; i++) {
    drawnNumbersList.push(bingoNumbersList[i]);
    if (drawnNumbersList.length < 5) continue;
    for (let card = 0; card < bingoCardsList.length; card++) {
      // Check for bingo in rows
      for (let row = 0; row < 5; row++) {
        bingoCondtionCounter = 0;
        for (let col = 0; col < 5; col++) {
          for (let j = 0; j < drawnNumbersList.length; j++) {
            if (bingoCardsList[card][row][col] == drawnNumbersList[j]) bingoCondtionCounter++;
            if (bingoCondtionCounter === 5) return [card, parseInt(bingoNumbersList[i]), drawnNumbersList.map((item) => parseInt(item))];
          }
        }
      }

      // Check for bingo in columns
      for (let col = 0; col < 5; col++) {
        bingoCondtionCounter = 0;
        for (let row = 0; row < 5; row++) {
          for (let j = 0; j < drawnNumbersList.length; j++) {
            if (bingoCardsList[card][row][col] == drawnNumbersList[j]) bingoCondtionCounter++;
            if (bingoCondtionCounter === 5) return [card, parseInt(bingoNumbersList[i]), drawnNumbersList.map((item) => parseInt(item))];
          }
        }
      }
    }
  }
}

// Returns a new array of [index of the card where the last bingo is, the winning number, array with the drawn numbers]
function findBingoLast() {
  let drawnNumbersList = [];
  let bingoCondtionCounter = 0; // When it reaches 5 bingo is achieved
  let cardsToSkip = [];

  for (let i = 0; i < bingoNumbersList.length; i++) {
    drawnNumbersList.push(bingoNumbersList[i]);
    if (drawnNumbersList.length < 5) continue;
    for (let card = 0; card < bingoCardsList.length; card++) {
      // If the card had a bingo already we skip it and continue to next one
      let skipCard = false;
      for (let j = 0; j < cardsToSkip.length; j++) {
        if (card === cardsToSkip[j]) skipCard = true;
      }
      if (skipCard) continue;

      let cardGotBingo = false;
      // Check for bingo in rows
      for (let row = 0; row < 5; row++) {
        bingoCondtionCounter = 0;
        if (cardGotBingo) break;
        for (let col = 0; col < 5; col++) {
          if (cardGotBingo) break;
          for (let j = 0; j < drawnNumbersList.length; j++) {
            if (cardGotBingo) break;
            if (bingoCardsList[card][row][col] == drawnNumbersList[j]) bingoCondtionCounter++;
            if (bingoCardsList.length - cardsToSkip.length <= 1 && bingoCondtionCounter === 5)
              return [card, parseInt(bingoNumbersList[i]), drawnNumbersList.map((item) => parseInt(item))];
            if (bingoCondtionCounter === 5) {
              cardsToSkip.push(card);
              cardGotBingo = true;
            }
          }
        }
      }
      // Check for bingo in columns
      for (let col = 0; col < 5; col++) {
        bingoCondtionCounter = 0;
        if (cardGotBingo) break;
        for (let row = 0; row < 5; row++) {
          if (cardGotBingo) break;
          for (let j = 0; j < drawnNumbersList.length; j++) {
            if (cardGotBingo) break;
            if (bingoCardsList[card][row][col] == drawnNumbersList[j]) bingoCondtionCounter++;
            if (bingoCardsList.length - cardsToSkip.length <= 1 && bingoCondtionCounter === 5)
              return [card, parseInt(bingoNumbersList[i]), drawnNumbersList.map((item) => parseInt(item))];
            if (bingoCondtionCounter === 5) {
              cardsToSkip.push(card);
              cardGotBingo = true;
            }
          }
        }
      }
    }
  }
}
