const nonZeroAdderVertical = (prevBoard) => {
  const convertedBoard = rowColConverter(prevBoard);
  const returnBoard = [[], [], [], []];
  const [firstCol, secondCol, thirdCol, fourthCol] = convertedBoard;
  const firstColFiltered = firstCol.filter((tile) => tile > 0);
  const secondColFiltered = secondCol.filter((tile) => tile > 0);
  const thirdColFiltered = thirdCol.filter((tile) => tile > 0);
  const fourthColFiltered = fourthCol.filter((tile) => tile > 0);

  const filterAndAdd = (col, colNum) => {
    for (let i = 0; i < col.length; i++) {
      if (col[i] === col[i + 1]) {
        returnBoard[colNum].push(col[i] * 2);
        i++;
      } else if (col[i]) {
        returnBoard[colNum].push(col[i]);
      }
    }
  };

  filterAndAdd(firstColFiltered, 0);
  filterAndAdd(secondColFiltered, 1);
  filterAndAdd(thirdColFiltered, 2);
  filterAndAdd(fourthColFiltered, 3);

  let newBoard = [[], [], [], []];

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (returnBoard[i][j] !== undefined) {
        newBoard[i][j] = returnBoard[i][j];
      } else {
        newBoard[i][j] = 0;
      }
    }
  }

  return rowColConverter(newBoard);
};

const rowColConverter = (board) => {
  return board.map((row, i) => {
    return row.map((val, j) => {
      return board[j][i];
    });
  });
};

export default nonZeroAdderVertical;
let board = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];

console.log(rowColConverter(board));
