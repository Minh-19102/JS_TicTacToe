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
const play_x = document.getElementById("Play_x");
const play_o = document.getElementById("Play_o");
var userTurn = 0;
var botTurn = 1;

restart_button.addEventListener("click", startGame);
play_x.addEventListener("click", x_go_first);
play_o.addEventListener("click", o_go_first);

startGame();

function startGame() {
   WINNING_MESSAGE_ELEMENT.classList.remove("show");
   cellElements.forEach((cell) => {
      cell.classList.remove(CLASS[0]);
      cell.classList.remove(CLASS[1]);
      cell.removeEventListener("click", handleClick);
      cell.addEventListener("click", handleClick, { once: true });
   });
   setBoardHoverClass();
   if (botTurn == 0) ticTacToe_bot();
   board.classList.add(CLASS[userTurn]);
}

function handleClick(e) {
   let cell = e.target;
   if (cell.classList.contains("x")) return;
   if (cell.classList.contains("circle")) return;
   placeMark(cell, CLASS[userTurn]);
   if (checkWin(CLASS[userTurn])) {
      endgame(false, "USER");
   } else if (isDraw()) {
      endgame(true);
   }
   ticTacToe_bot();
   if (checkWin(CLASS[botTurn])) {
      endgame(false, "BOT");
   } else if (isDraw()) {
      endgame(true);
   }
   setBoardHoverClass();
}

function checkWin(currentClass) {
   return WINNING_COMBINATION.some((combination) => {
      return combination.every((index) => {
         return cellElements[index].classList.contains(currentClass);
      });
   });
}

function endgame(draw, who) {
   if (draw) {
      WINNING_MESSAGE.innerText = `DRAW`;
   } else {
      WINNING_MESSAGE.innerText = `${who} WIN`;
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

function x_go_first() {
   userTurn = 0;
   botTurn = 1;
   startGame();
}
function o_go_first() {
   userTurn = 1;
   botTurn = 0;
   startGame();
}

function setBoardHoverClass() {
   board.classList.remove(CLASS[0]);
   board.classList.remove(CLASS[1]);
   board.classList.add(CLASS[userTurn]);
}

function ticTacToe_bot() {
   let user_Mark = {},
      bot_Mark = {};
   let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
   for (let index = 0; index < 9; index++) {
      if (cellElements[index].classList.contains(CLASS[userTurn])) {
         user_Mark[index] = true;
         board[index] = -1;
      }
      if (cellElements[index].classList.contains(CLASS[botTurn])) {
         bot_Mark[index] = true;
         board[index] = 1;
      }
   }
   if (user_Mark[4] != true && bot_Mark[4] != true) {
      placeMark(cellElements[4], CLASS[botTurn]);
      return;
   }
   if (!attack(board))
      if (!defend(board)) {
         if (board[0] == 0 && board[5] != -1) {
            placeMark(cellElements[0], CLASS[botTurn]);
            return;
         }
         if (board[2] == 0) {
            placeMark(cellElements[2], CLASS[botTurn]);
            return;
         }
         if (board[6] == 0) {
            placeMark(cellElements[6], CLASS[botTurn]);
            return;
         }
         if (board[8] == 0) {
            placeMark(cellElements[8], CLASS[botTurn]);
            return;
         }
         if (board[1] == 0) {
            placeMark(cellElements[1], CLASS[botTurn]);
            return;
         }
         if (board[3] == 0) {
            placeMark(cellElements[3], CLASS[botTurn]);
            return;
         }
         if (board[5] == 0) {
            placeMark(cellElements[5], CLASS[botTurn]);
            return;
         }
         if (board[7] == 0) {
            placeMark(cellElements[7], CLASS[botTurn]);
            return;
         }
      }
}

function attack(board) {
   if (check_attack(board, 0, 1, 2)) return true;
   if (check_attack(board, 3, 4, 5)) return true;
   if (check_attack(board, 6, 7, 8)) return true;
   if (check_attack(board, 0, 3, 6)) return true;
   if (check_attack(board, 1, 4, 7)) return true;
   if (check_attack(board, 2, 5, 8)) return true;
   if (check_attack(board, 0, 4, 8)) return true;
   if (check_attack(board, 2, 4, 6)) return true;
   return false;
}

function check_attack(board, index1, index2, index3) {
   if (board[index1] + board[index2] + board[index3] == 2) {
      if (board[index1] == 0) {
         placeMark(cellElements[index1], CLASS[botTurn]);
         return true;
      }
      if (board[index2] == 0) {
         placeMark(cellElements[index2], CLASS[botTurn]);
         return true;
      }
      if (board[index3] == 0) {
         placeMark(cellElements[index3], CLASS[botTurn]);
         return true;
      }
   }
   return false;
}

function defend(board) {
   if (check_defend(board, 0, 1, 2)) return true;
   if (check_defend(board, 3, 4, 5)) return true;
   if (check_defend(board, 6, 7, 8)) return true;
   if (check_defend(board, 0, 3, 6)) return true;
   if (check_defend(board, 1, 4, 7)) return true;
   if (check_defend(board, 2, 5, 8)) return true;
   if (check_defend(board, 0, 4, 8)) return true;
   if (check_defend(board, 2, 4, 6)) return true;
   return false;
}

function check_defend(board, index1, index2, index3) {
   if (board[index1] + board[index2] + board[index3] == -2) {
      if (board[index1] == 0) {
         placeMark(cellElements[index1], CLASS[botTurn]);
         return true;
      }
      if (board[index2] == 0) {
         placeMark(cellElements[index2], CLASS[botTurn]);
         return true;
      }
      if (board[index3] == 0) {
         placeMark(cellElements[index3], CLASS[botTurn]);
         return true;
      }
      return false;
   }
}
