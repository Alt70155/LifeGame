"use strict";

const tableSize = 40;
let currentState = [];
let currentNextState = [];
let id;
let sameAsBeforeCnt = 0;

let init = () => {
  let table = document.getElementById("table");
  let ct = 0;
  for (let i = 0; i < tableSize; i++) {
    let tr = document.createElement("tr");
    let currentStateTemp = [];
    for (let j = 0; j < tableSize; j++) {
      let td = document.createElement("td");
      outerFrameHidden(td, ct, i, j);
      td.id = "num" + ct;
      td.classList.add("white");
      td.onclick = onClickFunc;
      tr.appendChild(td);
      currentStateTemp.push(0);
      ct++;
    }
    table.appendChild(tr);
    currentState.push(currentStateTemp);
  }
  //currentStateをNextに値渡しして配列を複製
  currentNextState = JSON.parse(JSON.stringify(currentState));
}

//外枠１マス分多く取って処理・計算しているため、tableの一番外側を非表示にする。
let outerFrameHidden = (td, ct, i, j) => {
  if (i === 0) {
    td.classList.add("upper-side");
  }
  if (i !== 0 && ct % tableSize === 0) {
    td.classList.add("left-side");
  }
  if (ct % tableSize === tableSize - 1) {
    td.classList.add("right-side");
  }
  if (ct >= tableSize * tableSize - tableSize) {
    td.classList.add("bottom-side");
  }
}

let onClickFunc = (e) => {
  let targetId = e.target.id;
  //要素の最初のクラスを取得
  let targetClass = e.target.className.split(" ")[0];
  //classが外枠のクラスだった場合をはじく
  if (targetClass !== "left-side" && targetClass !== "right-side" && targetClass !== "upper-side" && targetClass !== "bottom-side") {
    initPaintFunc(targetId);
  }
}


let updateArrayToNextState = () => {
  //外枠を抜かして判定
  for (let i = 1; i != tableSize - 1; i++) {
    for (let j = 1; j != tableSize - 1; j++) {
      let n = lifeDeathJudge(i, j);
      if (currentState[i][j]) {
        n === 2 || n === 3 ? currentNextState[i][j] = 1 : currentNextState[i][j] = 0;
      } else {
        n === 3 ? currentNextState[i][j] = 1 : currentNextState[i][j] = 0;
      }
    }
  }
  infinityCheck();
  //配列を上書き
  return currentState = JSON.parse(JSON.stringify(currentNextState));
}

let updateCellColor = () => {
  updateArrayToNextState().forEach(function(y, index1) {
    y.forEach(function(x, index2) {
      //二次元配列のindexからid番号を計算
      let idNum = index1 * tableSize + index2;
      if (x === 1) {
        paintBlack("num" + idNum);
      } else {
        paintWhite("num" + idNum);
      }
    });
  });
}

//自マスの周りの生死を判定
let lifeDeathJudge = (i, j) => {
  let aliveState = 0;
  let diffCoor = [-1, 0 ,1];
  diffCoor.forEach(function(y) {
    diffCoor.forEach(function(x) {
      //現座標から周囲8方向の座標を計算
      let iy = i + y;
      let jx = j + x;
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

let initPaintFunc = (paintTileId) => {
  //IDから二次元配列の座標を取り出す
  let result = paintTileId.split("m");
  let i = result[1] / tableSize;
  let j = result[1] % tableSize;
  i = Math.floor(i);
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
  td.classList.remove("white");
  td.classList.add("black");
}

let paintWhite = (paintTileId) => {
  let td = document.getElementById(paintTileId);
  td.classList.remove("black");
  td.classList.add("white");
}

let infinityCheck = () => {
  //無限ループ防止に前回の配列と100秒間同じだった場合止める
  const STOP_TIME = 100;
  if(currentState.toString() === currentNextState.toString()) {
    sameAsBeforeCnt++;
    if(sameAsBeforeCnt === STOP_TIME) {
      stop();
    }
  }
}

let clearTable = () => {
  if(typeof id !== "undefined") {
    stop();
  }
  currentState.forEach(function(y, idx1) {
    currentState.forEach(function(x, idx2) {
      if(currentState[idx1][idx2] === 1) {
        currentState[idx1][idx2] = 0;
        let targetId = idx1 * tableSize + idx2;
        paintWhite("num" + targetId);
      }
    });
  });
}

let start = () => {
  id = setInterval(updateCellColor, 100);
}

let stop = () => {
  clearInterval(id);
}
