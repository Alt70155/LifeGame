"use strict";

const arraySize = 14;
const tableSize = arraySize - 1;
let currentState = [];
let currentNextState = [];
let id = 0;
let sameAsBeforeCnt = 0;

const init = () => {
  const table = document.getElementById("table");
  let ct = arraySize + 1;
  for (let i = 1; i < tableSize; i++) {
    const tr = document.createElement("tr");
    for (let j = 1; j < tableSize; j++) {
      const td = document.createElement("td");
      td.id = "num" + ct;
      td.classList.add("white");
      td.onclick = onClickFunc;
      tr.appendChild(td);
      ct++;
    }
    ct = ct + 2;
    table.appendChild(tr);
  }
  currentState = JSON.parse(JSON.stringify((new Array(arraySize)).fill((new Array(arraySize)).fill(0))));
  currentNextState = JSON.parse(JSON.stringify(currentState));
}

const onClickFunc = (e) => initPaintFunc(e.target.id);

const updateArrayToNextState = () => {
  for (let i = 1; i < tableSize; i++) {
    for (let j = 1; j < tableSize; j++) {
      const cellCountResult = lifeDeathJudge(i, j);
      if (currentState[i][j]) {
        cellCountResult === 2 || cellCountResult === 3 ? currentNextState[i][j] = 1 : currentNextState[i][j] = 0;
      } else {
        cellCountResult === 3 ? currentNextState[i][j] = 1 : currentNextState[i][j] = 0;
      }
    }
  }
  return currentState = JSON.parse(JSON.stringify(currentNextState));
}

const updateCellColor = () => {
  updateArrayToNextState().forEach(function(inArray, i) {
    inArray.forEach(function(x, j) {
      const targetId = i * arraySize + j;
      x === 1 ? paintBlack("num" + targetId) : paintWhite("num" + targetId);
    });
  });
}

const lifeDeathJudge = (i, j) => {
  let aliveState = 0;
  const diffCoor = [-1, 0, 1];
  diffCoor.forEach(function(y) {
    diffCoor.forEach(function(x) {
      if (i + y != i || j + x != j) {
        if (currentState[i + y][j + x]) {
          aliveState++;
        }
      }
    });
  });
  return aliveState;
}

const initPaintFunc = (paintTileId) => {
  const i = Math.floor(paintTileId.split("m")[1] / arraySize)
  const j = paintTileId.split("m")[1] % arraySize;
  if (currentState[i][j]) {
    currentState[i][j] = 0;
    paintWhite(paintTileId);
  } else {
    currentState[i][j] = 1;
    paintBlack(paintTileId);
  }
}

let paintBlack = (paintTileId) => {
  let td = document.getElementById(paintTileId);
  if (td !== null) {
    td.classList.remove("white");
    td.classList.add("black");
  }
}

let paintWhite = (paintTileId) => {
  let td = document.getElementById(paintTileId);
  if (td !== null) {
    td.classList.remove("black");
    td.classList.add("white");
  }
}

const start = () => id = setInterval(updateCellColor, 80);
const stop = () => clearInterval(id);
const clear = () => location.reload();
