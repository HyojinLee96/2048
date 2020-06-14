const nonZeroAdderVertical = (prevBoard, direction) => {
  const convertedBoard = rowColConverter(prevBoard);
  const currentBoard = [[], [], [], []];
  const [firstCol, secondCol, thirdCol, fourthCol] = convertedBoard;
  const firstColFiltered = firstCol.filter((tile) => tile > 0);
  const secondColFiltered = secondCol.filter((tile) => tile > 0);
  const thirdColFiltered = thirdCol.filter((tile) => tile > 0);
  const fourthColFiltered = fourthCol.filter((tile) => tile > 0);

  const filterAndAdd = (col, colNum, direction) => {
    if (direction === "up") {
      for (let i = 0; i < col.length; i++) {
        if (col[i] === col[i + 1]) {
          currentBoard[colNum].push(col[i] * 2);
          i++;
        } else if (col[i]) {
          currentBoard[colNum].push(col[i]);
        }
      }
      let countZeros = currentBoard.length - currentBoard[colNum].length;
      for (let i = 0; i < countZeros; i++) {
        currentBoard[colNum].push(0);
      }
    } else if (direction === "down") {
      for (let i = col.length - 1; i >= 0; i--) {
        if (col[i] === col[i - 1]) {
          currentBoard[colNum].unshift(col[i] * 2);
          i--;
        } else if (col[i]) {
          currentBoard[colNum].unshift(col[i]);
        }
      }
      let countZeros = currentBoard.length - currentBoard[colNum].length;
      for (let i = 0; i < countZeros; i++) {
        currentBoard[colNum].unshift(0);
      }
    }
  };

  filterAndAdd(firstColFiltered, 0, direction);
  filterAndAdd(secondColFiltered, 1, direction);
  filterAndAdd(thirdColFiltered, 2, direction);
  filterAndAdd(fourthColFiltered, 3, direction);

  return rowColConverter(currentBoard);
};

const rowColConverter = (board) => {
  return board.map((row, i) => {
    return row.map((val, j) => {
      return board[j][i];
    });
  });
};

export default nonZeroAdderVertical;
