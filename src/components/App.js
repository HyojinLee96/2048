import React, { Component } from "react";

import { uuid } from "uuidv4";
import "./App.css";
import Row from "./Row";
import LodingAni from "./LodingAni";
import StartBtn from "./StartBtn";
import { moveTile, rowColConverter } from "../functions/moveTile";

// 게임 오버 체크
// - 모든 방향으로 움직일 수 있는지 없는지 체크하기
// 점수 2048 도달시 성공 모달 창 띄우기, 게임은 오버가 될때까지 계속할 수 있다.
//        모달 창에 game continue? new game? 등의 버튼 추가

class App extends Component {
  constructor() {
    super();
    this.state = {
      board: null,
      score: 0,
      gameOver: false,
      modalIsOpen: false,
    };
  }

  openModal = () => {
    this.setState({
      modalIsOpen: true,
    });
  };

  afterOpenModal = () => {};

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
    });
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
    if (coordinate === undefined) {
      return board;
    }
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
    if (this.state.gameOver === true) {
      return;
    }
    if (e.keyCode >= 37 && e.keyCode <= 40) {
      // const currentBoard = [[], [], [], []];
      if (e.keyCode === 37) {
        const newBoard = moveTile(this.state.board, "left");
        this.setState({
          board: newBoard,
        });
      } else if (e.keyCode === 38) {
        // up key pressed
        const newBoard = moveTile(this.state.board, "up");
        this.setState({
          board: newBoard,
        });
      } else if (e.keyCode === 39) {
        // right key pressed
        const newBoard = moveTile(this.state.board, "right");
        this.setState({
          board: newBoard,
        });
      } else if (e.keyCode === 40) {
        // down key pressed
        const newBoard = moveTile(this.state.board, "down");
        this.setState({
          board: newBoard,
        });
      }
    }
    this.addNewNumber();
    this.gameOverHandler();
  };

  gameOverHandler = () => {
    if (this.findEmptyCell(this.state.board).length !== 0) {
      return;
    }
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4 - 1; j++) {
        if (this.state.board[i][j] === this.state.board[i][j + 1]) {
          return;
        }
      }
    }

    const convertedBoard = rowColConverter(this.state.board);
    for (let i = 0; i < convertedBoard.length; i++) {
      for (let j = 0; j < convertedBoard.length - 1; j++) {
        if (convertedBoard[i][j] === convertedBoard[i][j + 1]) {
          return;
        }
      }
    }

    return this.setState({
      gameOver: true,
    });
  };

  render() {
    return (
      <div className='App' onKeyPress={this.keyPressed}>
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
