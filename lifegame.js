"use strict";

let tableSize = 5;
let currentState = [];
let currentNextState = [];

let init = () => {
  let table = document.getElementById("table");
  let ct = 0;
  for (let i = 0; i < tableSize; i++) {
    let tr = document.createElement("tr");
    let currentStateTemp = [];
    for (let j = 0; j < tableSize; j++) {
      let td = document.createElement("td");
      // td.textContent = ct;
      td.id = "num" + ct;
      td.classList.add("num" + ct);
      td.classList.add("white");
      tr.appendChild(td);
      currentStateTemp.push(0);
      ct++;
    }
    table.appendChild(tr);
    currentState.push(currentStateTemp);
  }
  currentNextState = JSON.parse(JSON.stringify(currentState));
}

let next = () => {
  for (let i = 1; i != tableSize - 1; i++) {
    for (let j = 1; j != tableSize - 1; j++) {
      let n = 0;
      n = circumferenceJudge(i, j);
      if (currentState[i][j]) {
        if (n === 2 || n === 3) {
          currentNextState[i][j] = 1;
        } else {
          currentNextState[i][j] = 0;
        }
      } else {
        n === 3 ? currentNextState[i][j] = 1 : currentNextState[i][j] = 0;
      }
    }
  }
  return currentState = JSON.parse(JSON.stringify(currentNextState));
}

let update = () => {
  next().forEach(function(y, index1) {
    y.forEach(function(x, index2) {
      let classNum = index1 * tableSize + index2;
      if (x === 1) {
        paintBlack("num" + classNum);
      } else {
        paintWhite("num" + classNum);
      }
    });
  });

  // for(let y = 0; y < tableSize; y++) {
  //   for(let x = 0; x < tableSize; x++) {
  //     let n = y * tableSize + x; //tdのクラス番号を計算
  //     if(currentState[y][x] === 1) {
  //       paintBlack("num" + n);
  //     } else {
  //       paintWhite("num" + n);
  //     }
  //   }
  // }
}

//自マスの周りの状況を判定
let circumferenceJudge = (i, j) => {
  let aliveState = 0;
  for (let y = -1; y < 2; y++) {
    for (let x = -1; x < 2; x++) {
      let iy = i + y;
      let jx = j + x;
      //比較する座標がx,y両方i,yと同じだった場合(自分のマスだった場合)、カウントしない
      if (iy != i || jx != j) {
        if (currentState[iy][jx] === 1) {
          aliveState++;
        }
      }
    }
  }
  return aliveState;
}

let paintFunc = (paintTileClass) => {
  let result = paintTileClass.split("m");
  let i = result[1] / tableSize;
  let j = result[1] % tableSize;
  let td = document.getElementById(paintTileClass);
  i = Math.floor(i);
  currentState[i][j] = 1;
  paintBlack(paintTileClass);
}


let paintBlack = (paintTileClass) => {
  let td = document.getElementById(paintTileClass);
  td.classList.remove("white");
  td.classList.add("black");
}

let paintWhite = (paintTileClass) => {
  let td = document.getElementById(paintTileClass);
  td.classList.remove("black");
  td.classList.add("white");
}

init();
paintFunc("num17");
paintFunc("num7");
paintFunc("num12");
// for (let i = 0; i != tableSize; i++) {
//   for (let j = 0; j != tableSize; j++) {
//     document.write(currentState[i][j] + "　");
//   }
//   document.write("<br>");
// }
// document.write("<br>");
// for (let i = 0; i != tableSize; i++) {
//   for (let j = 0; j != tableSize; j++) {
//     document.write(currentNextState[i][j] + "　");
//   }
//   document.write("<br>");
// }
