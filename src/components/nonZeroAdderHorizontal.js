const nonZeroAdderHorizontal = (prevBoard, direction) => {
  const currentBoard = [[], [], [], []];
  const [firstRow, secondRow, thirdRow, fourthRow] = prevBoard;
  const firstRowFiltered = firstRow.filter((tile) => tile > 0);
  const secondRowFiltered = secondRow.filter((tile) => tile > 0);
  const thirdRowFiltered = thirdRow.filter((tile) => tile > 0);
  const fourthRowFiltered = fourthRow.filter((tile) => tile > 0);

  const filterAndAdd = (row, rowNum, direction) => {
    if (direction === "left") {
      for (let i = 0; i < row.length; i++) {
        if (row[i] === row[i + 1]) {
          currentBoard[rowNum].push(row[i] * 2);
          i++;
        } else if (row[i]) {
          currentBoard[rowNum].push(row[i]);
        }
      }
    } else if (direction === "right") {
    }
  };
  if (direction === "left") {
    filterAndAdd(firstRowFiltered, 0, direction);
    filterAndAdd(secondRowFiltered, 1, direction);
    filterAndAdd(thirdRowFiltered, 2, direction);
    filterAndAdd(fourthRowFiltered, 3, direction);
    // for (let i = 0; i < firstRowFiltered.length; i++) {
    //   if (firstRowFiltered[i] === firstRowFiltered[i + 1]) {
    //     currentBoard[0].push(firstRowFiltered[i] * 2);
    //     i++;
    //   } else if (firstRowFiltered[i]) {
    //     currentBoard[0].push(firstRowFiltered[i]);
    //   }
    // }
  }

  if (direction === "right") {
    filterAndAdd(firstRowFiltered, 0, direction);
    filterAndAdd(secondRowFiltered, 1, direction);
    filterAndAdd(thirdRowFiltered, 2, direction);
    filterAndAdd(fourthRowFiltered, 3, direction);
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

// for (let i = 0; i < currentBoard.length; i++) {
//   if (direction === "left") {
//     let howManyZeros = currentBoard.length - currentBoard[i].length;
//     currentBoard[i].push(0); // howManyZero 숫자 만큼 한다.
//   }
// }

// [4, 2] -> [4, 2, 0, 0]
//       -> [0, 0, 4, 2]
