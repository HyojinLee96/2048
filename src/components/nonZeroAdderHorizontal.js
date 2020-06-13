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

  // 현재 칸과 다음 칸이 같은 숫자면 제곱으로 계산 후 넣고, 그게 아닌 경우(if가 아니면서 숫자가 있는 경우)는 그냥 넣기

  // rowNum의 필요성은 currentBoard에 첫째 칸, 둘째 칸을 구별하기 위해서 사용하는건가요 필립님!?!?!?!???
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

  // 왼쪽을 눌렀을 경우
  if (direction === "left") {
    // 배열의 0부터 3까지 체크
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

  // 위에서 걸러진 currentBoard를 this.state.board에 재할당 해줄 newBoard에 넣는데 값이 있으면 넣고 없다면 0을 넣는다.
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