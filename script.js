const cellElements = document.querySelectorAll("[data-cell]");
const CLASS = ["x", "circle"];
const WINNING_COMBINATION = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6],
];
const WINNING_MESSAGE = document.querySelector("[data-winning-message-text]");
const WINNING_MESSAGE_ELEMENT = document.getElementById("winning-Message");
const restart_button = document.getElementById("restartButton");
var turn = 0;

startGame();

function startGame() {
   turn = 0;
   setBoardHoverClass();
   board.classList.add(CLASS[turn]);
   WINNING_MESSAGE_ELEMENT.classList.remove("show");
   cellElements.forEach((cell) => {
      cell.classList.remove(CLASS[0]);
      cell.classList.remove(CLASS[1]);
      cell.removeEventListener("click", handleClick);
      cell.addEventListener("click", handleClick, { once: true });
   });
}

restart_button.addEventListener("click", startGame);

function handleClick(e) {
   let cell = e.target;
   let currentClass = CLASS[turn];
   placeMark(cell, currentClass);
   if (checkWin(currentClass)) {
      endgame(false);
   } else if (isDraw()) {
      endgame(true);
   }
   switchTurn();
   setBoardHoverClass();
}

function checkWin(currentClass) {
   return WINNING_COMBINATION.some((combination) => {
      return combination.every((index) => {
         return cellElements[index].classList.contains(currentClass);
      });
   });
}

function endgame(draw) {
   if (draw) {
      WINNING_MESSAGE.innerText = `DRAW`;
   } else {
      WINNING_MESSAGE.innerText = `${turn ? "O" : "X"} WIN`;
   }
   WINNING_MESSAGE_ELEMENT.classList.add("show");
}

function isDraw() {
   let numX = document.getElementsByClassName("cell x").length;
   let numO = document.getElementsByClassName("cell circle").length;
   return numO + numX == 9;
}

function placeMark(cell, currentClass) {
   cell.classList.add(currentClass);
}

function switchTurn() {
   turn = 1 - turn;
}

function setBoardHoverClass() {
   board.classList.remove(CLASS[0]);
   board.classList.remove(CLASS[1]);
   board.classList.add(CLASS[turn]);
}
