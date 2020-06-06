const nonZeroAdderHorizontal = (prevBoard, direction) => {
  const currentBoard = [[], [], [], []];
  const [firstRow, secondRow, thirdRow, fourthRow] = prevBoard;
  const firstRowFiltered = firstRow.filter((tile) => tile > 0);
  const secondRowFiltered = secondRow.filter((tile) => tile > 0);
  const thirdRowFiltered = thirdRow.filter((tile) => tile > 0);
  const fourthRowFiltered = fourthRow.filter((tile) => tile > 0);

  const filterAndAdd = (row, rowNum) => {
    for (let i = 0; i < row.length; i++) {
      if (row[i] === row[i + 1]) {
        currentBoard[rowNum].push(row[i] * 2);
        i++;
      } else if (row[i]) {
        currentBoard[rowNum].push(row[i]);
      }
    }
  };
  if (direction === "left") {
    filterAndAdd(firstRowFiltered, 0);
    filterAndAdd(secondRowFiltered, 1);
    filterAndAdd(thirdRowFiltered, 2);
    filterAndAdd(fourthRowFiltered, 3);
    // for (let i = 0; i < firstRowFiltered.length; i++) {
    //   if (firstRowFiltered[i] === firstRowFiltered[i + 1]) {
    //     currentBoard[0].push(firstRowFiltered[i] * 2);
    //     i++;
    //   } else if (firstRowFiltered[i]) {
    //     currentBoard[0].push(firstRowFiltered[i]);
    //   }
    // }
  }

  let newBoard = [[], [], [], []];

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (currentBoard[i][j] !== undefined) {
        newBoard[i][j] = currentBoard[i][j];
      } else {
        newBoard[i][j] = 0;
      }
    }
  }

  return newBoard;
};

export default nonZeroAdderHorizontal;
