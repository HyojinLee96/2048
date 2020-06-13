import React, { Component } from "react";
import { uuid } from "uuidv4";
import "./App.css";
import Row from "./Row";
import LodingAni from "./LodingAni";
import StartBtn from "./StartBtn";
import nonZeroAdderHorizontal from "./nonZeroAdderHorizontal";
import nonZeroAdderVertical from "./nonZeroAdderVertical";

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
    if (e.keyCode >= 37 && e.keyCode <= 40) {
      // const currentBoard = [[], [], [], []];
      if (e.keyCode === 37) {
        const newBoard = nonZeroAdderHorizontal(this.state.board, "left");
        this.setState({
          board: newBoard,
        });
        this.addNewNumber();
      } else if (e.keyCode === 38) {
        // up key pressed
        const newBoard = nonZeroAdderVertical(this.state.board, "up");
        this.setState({
          board: newBoard,
        });
        this.addNewNumber();
      } else if (e.keyCode === 39) {
        // right key pressed
        const newBoard = nonZeroAdderHorizontal(this.state.board, "right");
        this.setState({
          board: newBoard,
        });
        this.addNewNumber();
      } else if (e.keyCode === 40) {
        // down key pressed
        const newBoard = nonZeroAdderVertical(this.state.board, "down");
        this.setState({
          board: newBoard,
        });
        this.addNewNumber();
      }
    }
    // this.setState({ board: currentBoard });
  };

  dummyFunc = () => {
    this.setState((prevState) => console.log(prevState.board));
    this.setState((prevState) => {
      prevState.board[0][0] = 100;
      return { board: prevState.board };
    });
  };

  render() {
    return (
      <div className='App' onKeyPress={this.keyPressed}>
        <button onClick={this.dummyFunc}>testing Dummy</button>
        <button onClick={this.addNewNumber}>못생긴버튼</button>
        <StartBtn onClickEvent={this.init} />
        <LodingAni />
        <div className='score'>Score : {this.state.score}</div>
        <table>
          {this.state.board &&
            this.state.board.map((row, i) => <Row key={uuid()} row={row} />)}
        </table>
      </div>
    );
  }
}

export default App;
