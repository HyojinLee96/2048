import React, { Component } from "react";
import { uuid } from "uuidv4";
import "./App.css";
import Row from "./components/Row";

class App extends Component {
  state = {
    board: null,
    score: 0,
  };

  init = () => {
    let board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    board = this.randomCoordinate(this.randomCoordinate(board));
    let score = board.reduce((acc, cur) => {
      return acc + cur.reduce((acc, cur) => acc + cur, 0);
    }, 0);

    this.setState({ board, score });
  };

  randomNumberGenerator = () => {
    // // 수정 전
    // const startNumber = [2, 4];
    // return startNumber[Math.floor(Math.random() * startNumber.length)];

    // 수정 후
    return Math.random() > 0.75 ? 4 : 2;
  };

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

  randomCoordinate = (board) => {
    const emptyCell = this.findEmptyCell(board);
    const coordinate = emptyCell[Math.floor(Math.random() * emptyCell.length)];
    // 직접 함수 리턴값을 넣어줌
    board[coordinate[0]][coordinate[1]] = this.randomNumberGenerator();

    return board;
  };

  componentDidMount() {
    // 바로 moveCells 로 바인딩
    document.body.addEventListener("keydown", this.moveCells);
    // mount될시 init실행
    this.init();
  }

  // // componentDidMount에서 변경되어서 필요없어짐.
  // keyPressed = (e) => {
  //   this.moveCells(e.keyCode);
  // };

  // 약간 맘에 안듬
  addNewNumber = () => {
    // randomCoordinate 함수가 state있는걸
    // board[coordinate[0]][coordinate[1]] = randomNumber; 로 직접 변경을 함
    const updatedBoard = this.randomCoordinate(this.state.board);
    // score update
    let score = this.state.board.reduce((acc, cur) => {
      return acc + cur.reduce((acc, cur) => acc + cur, 0);
    }, 0);

    this.setState({
      board: updatedBoard,
      score,
    });
  };

  moveCells = (e) => {
    if (e.keyCode === 37) {
      // left key pressed
      console.log("left key pressed!");
    } else if (e.keyCode === 38) {
      // up key pressed
      console.log("up key pressed!");
    } else if (e.keyCode === 39) {
      // right key pressed
      console.log("right key pressed!");
    } else if (e.keyCode === 40) {
      // down key pressed
      console.log("down key pressed!");
    }
  };

  render() {
    return (
      <div className='App' onKeyPress={this.keyPressed}>
        <button onClick={() => this.init()}>New Game</button>
        <button onClick={() => this.addNewNumber(this.state.board)}>
          add one
        </button>
        <div>Score:{this.state.score}</div>
        <table>
          {this.state.board &&
            this.state.board.map((row, i) => <Row key={uuid()} row={row} />)}
        </table>
      </div>
    );
  }
}

export default App;
