// prevBoard에는 this.state.board가 들어오고 direction은 왼쪽,오른쪽,위,아래 키를 구별하는 값이 들어온다
const moveTile = (prevBoard, direction) => {
  if ("updown".includes(direction)) {
    prevBoard = rowColConverter(prevBoard);
  }
  const currentBoard = [[], [], [], []];
  const [firstRow, secondRow, thirdRow, fourthRow] = prevBoard;
  const firstRowFiltered = firstRow.filter((tile) => tile > 0);
  const secondRowFiltered = secondRow.filter((tile) => tile > 0);
  const thirdRowFiltered = thirdRow.filter((tile) => tile > 0);
  const fourthRowFiltered = fourthRow.filter((tile) => tile > 0);

  const filterAndAdd = (row, rowNum, direction) => {
    if ("leftup".includes(direction)) {
      for (let i = 0; i < row.length; i++) {
        if (row[i] === row[i + 1]) {
          currentBoard[rowNum].push(row[i] * 2);
          i++;
        } else if (row[i]) {
          currentBoard[rowNum].push(row[i]);
        }
      }
      let countZeros = currentBoard.length - currentBoard[rowNum].length;
      for (let i = 0; i < countZeros; i++) {
        currentBoard[rowNum].push(0);
      }
    } else if ("rightdown".includes(direction)) {
      for (let i = row.length - 1; i >= 0; i--) {
        if (row[i] === row[i - 1]) {
          currentBoard[rowNum].unshift(row[i] * 2);
          i--;
        } else if (row[i]) {
          currentBoard[rowNum].unshift(row[i]);
        }
      }
      let countZeros = currentBoard.length - currentBoard[rowNum].length;
      for (let i = 0; i < countZeros; i++) {
        currentBoard[rowNum].unshift(0);
      }
    }
  };

  filterAndAdd(firstRowFiltered, 0, direction);
  filterAndAdd(secondRowFiltered, 1, direction);
  filterAndAdd(thirdRowFiltered, 2, direction);
  filterAndAdd(fourthRowFiltered, 3, direction);

  if ("downup".includes(direction)) {
    return rowColConverter(currentBoard);
  }
  return currentBoard;
};

const rowColConverter = (board) => {
  return board.map((row, i) => {
    return row.map((val, j) => {
      return board[j][i];
    });
  });
};

export { moveTile, rowColConverter };
