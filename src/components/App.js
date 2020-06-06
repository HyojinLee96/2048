import React, { Component } from "react";
import { uuid } from "uuidv4";
import "./App.css";
import Row from "./Row";
import LodingAni from './LodingAni';
import StartBtn from './StartBtn';

class App extends Component {
  state = {
    board: null,
    score: 0,
  };

  // 두 개의 랜덤 좌표로 보드 생성
  init = () => {
    let board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    board = this.randomCoordinate(this.randomCoordinate(board));
    
    this.setState({ board });
  };


  // 랜덤하게 시작 번호 뽑기
  randomNumberGenerator = () => {
    const startNumber = [2, 4];
    return startNumber[Math.floor(Math.random() * startNumber.length)];
  };

  // 보드에서 빈 좌표 찾기
  findEmptyCell = (board) => {
    const emptyCell = [];

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] === 0) {
          emptyCell.push([i, j]);
        }
      }
    }

    return emptyCell;
  };

  // 랜덤하게 뽑은 시작 번호 빈 좌표에 배치
  randomCoordinate = (board) => {
    const emptyCell = this.findEmptyCell(board);
    const randomNumberGenerator = this.randomNumberGenerator();
    const coordinate = emptyCell[Math.floor(Math.random() * emptyCell.length)];
    board[coordinate[0]][coordinate[1]] = randomNumberGenerator;

    return board;
  };


  componentDidMount() {
    document.body.addEventListener("keydown", this.keyPressed);
  }

  keyPressed = (e) => {
    this.moveCells(e.keyCode);
  };

  moveCells = (keyCode) => {
    if (keyCode === 37) {
      // left key pressed
      console.log("left key pressed!");
    } else if (keyCode === 38) {
      // up key pressed
      console.log("up key pressed!");
    } else if (keyCode === 39) {
      // right key pressed
      console.log("right key pressed!");
    } else if (keyCode === 40) {
      // down key pressed
      console.log("down key pressed!");
    }
  };

  render() {
    return (
      <div className="App" onKeyPress={this.keyPressed}>
        <StartBtn onClickEvent={this.init}/>
        <LodingAni />
        <div className="score">Score : {this.state.score}</div>
        <table>
          {this.state.board &&
            this.state.board.map((row, i) => <Row key={uuid()} row={row} />)}
        </table>
      </div>
    );
  }
}

export default App;
