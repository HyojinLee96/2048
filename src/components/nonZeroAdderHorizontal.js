// prevBoard에는 this.state.board가 들어오고 direction은 왼쪽,오른쪽,위,아래 키를 구별하는 값이 들어온다
const nonZeroAdderHorizontal = (prevBoard, direction) => {
  // currentBoard에는 값이 더해진 값이나 없는 경우엔 빈 배열이 들어가있다. 예)[[], [2], [4], []]
  const currentBoard = [[], [], [], []];
  const [firstRow, secondRow, thirdRow, fourthRow] = prevBoard;
  // 배열에 [2,0,4,0] 이런식으로 있으면 0을 제외한 것들 filter로 걸러주기
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
      let countZeros = currentBoard.length - currentBoard[rowNum].length;
      console.log(countZeros, currentBoard[rowNum]);
      for (let i = 0; i < countZeros; i++) {
        currentBoard[rowNum].push(0);
      }
    } else if (direction === "right") {
      for (let i = row.length - 1; i <= 0; i--) {
        if (row[i] === row[i - 1]) {
          currentBoard[rowNum].unshift(row[i] * 2);
          i--;
        } else if (row[i]) {
          currentBoard[rowNum].unshift(row[i]);
        }
      }
      let countZeros = currentBoard.length - currentBoard[rowNum].length;
      console.log(countZeros, currentBoard[rowNum]);
      for (let i = 0; i < countZeros; i++) {
        currentBoard[rowNum].unshift(0);
      }
    }
  };

  // 왼쪽을 눌렀을 경우
  if (direction === "left") {
    filterAndAdd(firstRowFiltered, 0, direction);
    filterAndAdd(secondRowFiltered, 1, direction);
    filterAndAdd(thirdRowFiltered, 2, direction);
    filterAndAdd(fourthRowFiltered, 3, direction);
  }

  if (direction === "right") {
    filterAndAdd(firstRowFiltered, 0, direction);
    filterAndAdd(secondRowFiltered, 1, direction);
    filterAndAdd(thirdRowFiltered, 2, direction);
    filterAndAdd(fourthRowFiltered, 3, direction);
  }

  // 위에서 걸러진 currentBoard를 this.state.board에 재할당 해줄 newBoard에 넣는데 값이 있으면 넣고 없다면 0을 넣는다.
  // 왼쪽을 눌렀을 때 보드의 앞쪽에 currentBoard[i][j] 숫자를 넣고 나머지는 0을 넣는다.
  // 오른쪽을 눌렀을 때에는 보드의 앞쪽에 0을 넣고 뒷쪽에 currentBoard[i][j] 숫자를 넣는다.
  // for (let i = 0; i < currentBoard.length; i++) {
  //   let howManyZeros = currentBoard.length - currentBoard[i].length;

  //   if (direction === "left") {
  //     let resultArr = [...currentBoard[i], ...repeatZerosArr];
  //     currentBoard[i] = resultArr;
  //   } else if (direction === "right") {
  //     let resultArr = [...repeatZerosArr, ...currentBoard[i]];
  //     currentBoard[i] = resultArr;
  //   }
  // }

  console.log(currentBoard);
  return currentBoard;
};

export default nonZeroAdderHorizontal;
