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
        td.textContent = ct;
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
    for(let i = 1; i != tableSize-1; i++) {
      for(let j = 1; j != tableSize-1; j++) {
        let n = 0;
        n = circumferenceJudge(i, j);
        if(currentState[i][j]) {
          if(n === 2 || n === 3) {
            currentNextState[i][j] = 1;
          } else {
            currentNextState[i][j] = 0;
          }
        } else {
          n === 3 ? currentNextState[i][j] = 1 : currentNextState[i][j] = 0;
        }
      }
    }
  }

  //自マスの周りの状況を判定
  let circumferenceJudge = (i, j) => {
    let aliveState = 0;
    for(let y = -1; y < 2; y++) {
      for(let x = -1; x < 2; x++) {
        if(currentState[i + y][j + x] !== currentState[i][j]) {
          if(currentState[i + y][j + x] === 1) {
            aliveState++;
          }
        }
      }
    }
    return aliveState;
  }

  let func = (x) => {
    let result = x.split("m");
    let len = result[1];
    let i = len / tableSize;
    let j = len % tableSize;
    let td = document.getElementById(x);
    i = Math.floor(i);
    paintBlack(td, i, j);
  }

  let paintBlack = (x, i, j) => {
    x.classList.remove("white");
    x.classList.add("black");
    currentState[i][j] = 1;
  }

  let paintWhite = (x, i, j) => {
    x.classList.remove("black");
    x.classList.add("white");
    currentState[i][j] = 0;
  }

  init();
  func("num11");
  func("num16");
  func("num8");
  func("num13");
  next();

  for (let i = 0; i != tableSize; i++) {
    for (let j = 0; j != tableSize; j++) {
      document.write(currentState[i][j] + "　");
    }
    document.write("<br>");
  }
  document.write("<br>");
  for (let i = 0; i != tableSize; i++) {
    for (let j = 0; j != tableSize; j++) {
      document.write(currentNextState[i][j] + "　");
    }
    document.write("<br>");
  }
