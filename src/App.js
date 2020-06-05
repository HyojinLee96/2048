import React, { Component } from "react";
import { uuid } from "uuidv4";
import "./App.css";
import Row from "./components/Row";

class App extends Component {
  state = {
    board: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    score: 0,
  };

  randomNumberGenerator = () => {
    const startNumber = [2, 4];
    return startNumber[Math.floor(Math.random() * startNumber.length)];
  };

  findEmptyCell = () => {
    const emptyCell = [];

    for (let i = 0; i < this.state.board.length; i++) {
      for (let j = 0; j < this.state.board.length; j++) {
        if (this.state.board[i][j] === 0) {
          emptyCell.push([i, j]);
        }
      }
    }

    return emptyCell;
  };

  randomCoordinate = () => {
    const emptyCell = this.findEmptyCell();
    const coordinate = emptyCell[Math.floor(Math.random() * emptyCell.length)];

    return coordinate;
  };

  init = () => {
    // const coordinate1 = this.randomCoordinate()
  };

  placeCell = () => {
    const coordinate = this.randomCoordinate();
    const twoOrFour = this.randomNumberGenerator();
    const newBoard = [
      [...this.state.board[0]],
      [...this.state.board[1]],
      [...this.state.board[2]],
      [...this.state.board[3]],
    ];

    newBoard[coordinate[0]][coordinate[1]] = twoOrFour;
    this.setState({
      board: newBoard,
      score: this.state.score + twoOrFour,
    });
  };

  render() {
    return (
      <div className='App'>
        <button onClick={this.placeCell}>GameStart</button>
        <div>Score:{this.state.score}</div>
        <table>
          {this.state.board.map((row, i) => (
            <Row key={uuid()} row={row} />
          ))}
        </table>
      </div>
    );
  }
}

export default App;
