import React, { Component } from "react";
import { uuid } from "uuidv4";
import "./App.css";
import Row from "./Row";
import LodingAni from "./LodingAni";
import StartBtn from "./StartBtn";

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
      const currentBoard = [[], [], [], []];
      if (e.keyCode === 37) {

        const [firstRow, secondRow, thirdRow, fourthRow] = this.state.board;
        const firstRowFiltered = firstRow.filter((tile) => tile > 0);
        const secondRowFiltered = secondRow.filter((tile) => tile > 0);
        const thirdRowFiltered = thirdRow.filter((tile) => tile > 0);
        const fourthRowFiltered = fourthRow.filter((tile) => tile > 0);

        for (let i = 0; i < firstRowFiltered.length; i++) {
          if (firstRowFiltered[i] === firstRowFiltered[i + 1]) {
            currentBoard[0].push(firstRowFiltered[i] * 2);
            i++;
          } else if (firstRowFiltered[i]) {
            currentBoard[0].push(firstRowFiltered[i]);
          }
        }

        for (let i = 0; i < secondRowFiltered.length; i++) {
          if (secondRowFiltered[i] === secondRowFiltered[i + 1]) {
            currentBoard[1].push(secondRowFiltered[i] * 2);
            i++;
          } else if (secondRowFiltered[i]) {
            currentBoard[1].push(secondRowFiltered[i]);
          }
        }

        for (let i = 0; i < thirdRowFiltered.length; i++) {
          if (thirdRowFiltered[i] === thirdRowFiltered[i + 1]) {
            currentBoard[2].push(thirdRowFiltered[i] * 2);
            i++;
          } else if (thirdRowFiltered[i]) {
            currentBoard[2].push(thirdRowFiltered[i]);
          }
        }

        for (let i = 0; i < fourthRowFiltered.length; i++) {
          if (fourthRowFiltered[i] === fourthRowFiltered[i + 1]) {
            currentBoard[3].push(fourthRowFiltered[i] * 2);
            i++;
          } else if (fourthRowFiltered[i]) {
            currentBoard[3].push(fourthRowFiltered[i]);
          }
        }

        console.log(currentBoard);
        let newBoard = [[], [], [], []];
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            if (currentBoard[i][j] !== undefined) {
              newBoard[i][j] = currentBoard[i][j];
            } else {
              newBoard[i][j] = 0;
            }
            this.setState({
              board: newBoard,
            });
          }
        }

        for (let i = 0; i < this.state.board.length; i++) {
          let count = 0;
          for (let j = 0; j < this.state.board.length; j++) {
            if(this.state.board[i][j]){
              console.log(this.state.board)
              if (currentBoard[i][currentBoard[i][count]] && 
                currentBoard[i][currentBoard[i][count]] === this.state.board[i][j]) {
                  currentBoard[i][currentBoard[i][count]] *= 2;
                  count++;
              }else {
                currentBoard[i].push(this.state.board[i][j]);
              }
            } 
          }
        }
        let newBoard = [[], [], [], []];
        for(let i = 0; i < 4; i++){
          for(let j = 0; j < 4; j++){
            if (currentBoard[i][j] !== undefined) {
              newBoard[i][j] = currentBoard[i][j]
            } else {
              newBoard[i][j] = 0
            }
            this.setState({
              board: newBoard
            });
          }
        }
        console.log(this.state.board)
      } else if (e.keyCode === 38) {
        // up key pressed
        console.log("up key pressed!");
      } else if (e.keyCode === 39) {
        // right key pressed
        console.log("right key pressed!");
      } else if (e.keyCode === 40) {
        // down key pressed
        console.log("down key pressed!");


  dummyFunc = (current) => {
    // this.setState((prevState) => {
    //   prevState.board[i][j] = current || 0
    // });
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
