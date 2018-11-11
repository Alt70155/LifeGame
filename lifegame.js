"use strict";

const arraySize = 40;
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
    let currentStateTemp = [];
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
  //初期値ゼロの二次元配列を作成
  currentState = JSON.parse(JSON.stringify((new Array(arraySize)).fill((new Array(arraySize)).fill(0))));
  //currentStateをNextに値渡しして配列を複製
  currentNextState = JSON.parse(JSON.stringify(currentState));
}

const onClickFunc = (e) => initPaintFunc(e.target.id);

const updateArrayToNextState = () => {
  //外枠を抜かして判定
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
  infinityLoopCheck();
  //配列を上書き
  return currentState = JSON.parse(JSON.stringify(currentNextState));
}

const updateCellColor = () => {
  updateArrayToNextState().forEach(function(inArray, i) {
    inArray.forEach(function(x, j) {
      //添字からidを計算
      const targetId = i * arraySize + j;
      if (x === 1) {
        paintBlack("num" + targetId);
      } else {
        paintWhite("num" + targetId);
      }
    });
  });
}

//自マスの周りの生死を判定
const lifeDeathJudge = (i, j) => {
  let aliveState = 0;
  const diffCoor = [-1, 0 ,1];
  diffCoor.forEach(function(y) {
    diffCoor.forEach(function(x) {
      //現座標から周囲8方向の座標を計算
      const iy = i + y;
      const jx = j + x;
       //比較する座標がx,y両方i,yと同じだった場合(自分のマスだった場合)、カウントしない
      if (iy != i || jx != j) {
        if (currentState[iy][jx] === 1) {
          aliveState++;
        }
      }
    });
  });
  return aliveState;
}

const initPaintFunc = (paintTileId) => {
  //IDから数字部分を取り出し、二次元配列の添字を求める
  //split後[num, 100] = [1] / 40 = 2
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

let infinityLoopCheck = () => {
  //無限ループ防止に前回の配列と100秒間同じだった場合止める
  const STOP_TIME = 100;
  if(currentState.toString() === currentNextState.toString()) {
    sameAsBeforeCnt++;
    if(sameAsBeforeCnt === STOP_TIME) {
      stop();
    }
  }
}

const clearCell = () => {
  if(typeof id !== "undefined") { stop(); }
  currentState.forEach(function(inArray, i) {
    inArray.forEach(function(x, j) {
      if(currentState[i][j]) {
        currentState[i][j] = 0;
        const targetId = i * arraySize + j;
        paintWhite("num" + targetId);
      }
    });
  });
}


const start = () => {
  if(id === 0) {
    id = setInterval(updateCellColor, 80);
  }
}

const stop = () => {
  clearInterval(id);
  id = 0;
}

const glider = () => {
  initPaintFunc("num83");
  initPaintFunc("num124");
  initPaintFunc("num164");
  initPaintFunc("num163");
  initPaintFunc("num162");
}
