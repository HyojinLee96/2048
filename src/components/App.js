import React, { Component } from 'react';
import { uuid } from 'uuidv4';
import { SwipeEventListener } from 'swipe-event-listener';
import './App.css';
import Row from './Row';
import LodingAni from './LodingAni';
import StartBtn from './StartBtn';
import { moveTile, rowColConverter } from '../functions/moveTile';
import Modal from './Modal';
import Alert from './alert';

class App extends Component {
  constructor() {
    super();
    const { swipeArea } = SwipeEventListener({
      swipeArea: document.querySelector('body'),
    });

    swipeArea.addEventListener('swipeDown', () => {
      this.moveCells({ keyCode: 40 });
    });
    swipeArea.addEventListener('swipeUp', () => {
      this.moveCells({ keyCode: 38 });
    });

    swipeArea.addEventListener('swipeLeft', () => {
      this.moveCells({ keyCode: 37 });
    });

    swipeArea.addEventListener('swipeRight', () => {
      this.moveCells({ keyCode: 39 });
    });
    this.state = {
      board: null,
      score: 0,
      gameOver: false,
      gameSuccess: false,
      continue: false,
    };
  }

  init = () => {
    document.body.addEventListener('keydown', this.moveCells);
    //swiping options

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

    this.setState({
      board,
      score,
      gameOver: false,
      gameSuccess: false,
      continue: false,
    });
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
      if (this.state.gameOver === true) {
        return;
      }

      let keyCodeObj = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
      };

      const newBoard = moveTile(this.state.board, keyCodeObj[e.keyCode]);
      let moved = this.moveCheckHandler(newBoard);
      if (moved === false) {
        this.setState({
          board: newBoard,
        });
        this.addNewNumber();
        this.gameOverHandler();
        this.gameSuccessHandler();
      }
    }
  };

  // this.state.board와 newBoard가 같지 않을 때, 움직일 수 없다면 return 값을 전달
  moveCheckHandler = (newBoard) => {
    for (let i = 0; i < this.state.board.length; i++) {
      for (let j = 0; j < this.state.board.length; j++) {
        if (this.state.board[i][j] !== newBoard[i][j]) {
          return false;
        }
      }
    }
    return true;
  };

  gameSuccessHandler = () => {
    if (!this.state.continue) {
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (this.state.board[i][j] === 2048) {
            this.setState({
              gameSuccess: true,
            });
            return;
          }
        }
      }
    }
  };

  gameOverHandler = () => {
    // findEmptyCell에 빈 칸이 하나라도 있다면 리턴
    if (this.findEmptyCell(this.state.board).length !== 0) {
      return;
    }

    for (let i = 0; i < 4; i++) {
      // [1,2,3,4] <- 여기서 비교해야 할 값은 1,2 / 2,3 / 3,4 로 세 가지 경우이기 때문에 j < 3의 조건식을 써준다.
      for (let j = 0; j < 3; j++) {
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
    document.body.removeEventListener('keydown', this.moveCells);
    return this.setState({
      gameOver: true,
    });
  };

  closeOrContinueHandler = (msg) => {
    if (msg === 'Success!') {
      // 2048을 성공적으로 달성했고, Continue를 하고싶다면
      this.setState({
        continue: true,
        gameSuccess: false,
      });
    }

    if (msg === 'Game Over!') {
      // 게임이 끝났고 그냥 모달창을 닫고싶다면
      this.setState({
        gameOver: false,
      });
      // 이곳에서 보드 띄우게끔 해주는 CSS 삽입하기
    }
  };

  setScoreToZero = () => {
    this.setState({ score: 0 });
  };

  render() {
    return (
      <div className='App' onKeyPress={this.keyPressed}>
        <Alert />
        {this.state.gameOver || this.state.gameSuccess ? (
          <React.Fragment>
            <div className='bg'></div>
            <Modal
              closeOrContinue={this.closeOrContinueHandler}
              gameOver={this.state.gameOver}
              newGame={this.init}
              score={this.state.score}
            />
          </React.Fragment>
        ) : null}
        <React.Fragment>
          <StartBtn onClickEvent={this.init} setScoreToZero={this.setScoreToZero} />
          <LodingAni />
          <div className='score'>Score : {this.state.score}</div>
          <table>
            {this.state.board && this.state.board.map((row, i) => <Row key={uuid()} row={row} />)}
          </table>
        </React.Fragment>
      </div>
    );
  }
}

export default App;
