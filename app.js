const input = [
  [51, 39, 64, 4, 42, 15, 23, 35],
  [20, 84, 66, 91, 72, 38, 19, 55],
  [94, 7, 28, 99, 36, 69, 8, 99],
  [79, 98, 91, 73, 11, 60, 76, 61],
  [98, 40, 65, 40, 54, 88, 74, 73],
  [71, 40, 63, 43, 77, 82, 97, 71],
  [89, 24, 71, 24, 93, 79, 23, 71],
  [76, 14, 43, 86, 73, 19, 47, 71]
];

const getNextPoints = (input, row, column, numRows, numColumns) => {
  const data = [];
  const currentValue = input[row][column];
  const startRow = row - 1;
  const endRow = row + 1;
  const startColumn = column - 1;
  const endColumn = column + 1;
  for (let i = startRow; i <= endRow; i++) {
    for (let j = startColumn; j <= endColumn; j++) {
      if (i >= 0 && i < numRows && j >= 0 && j < numColumns) {
        const nextValue = input[i][j];
        if (currentValue > nextValue) {
          data.push({ row: i, column: j });
        }
      }
    }
  }
  return data;
};

const getLongestPath = (input, row, column, numRows, numColumns, path) => {
  const nextPoints = getNextPoints(input, row, column, numRows, numColumns);
  if (nextPoints.length === 0) {
    return [path];
  }
  let output = [];
  for (const point of nextPoints) {
    const nextValue = input[point.row][point.column];
    const newPath = [...path, nextValue];
    output = [
      ...output,
      ...getLongestPath(
        input,
        point.row,
        point.column,
        numRows,
        numColumns,
        newPath
      )
    ];
  }
  return output;
};

const filterLongestPath = output => {
  let maxLength = 0;
  let result = [];
  for (const o of output) {
    if (o.length > maxLength) {
      result = [o];
      maxLength = o.length;
    } else if (o.length === maxLength) {
      result.push(o);
    }
  }
  return result.length === 1 ? result[0] : result;
};

const showLongestPath = output => {
  console.log("\n********************* RESULT *************************\n");
  console.log(filterLongestPath(output));
  console.log("\n******************************************************\n");
};

const start = input => {
  let output = [];
  const numRows = input.length;
  const numColumns = input[0].length;
  for (let row = 0; row < numRows; row++) {
    for (let column = 0; column < numColumns; column++) {
      const path = [input[row][column]];
      output = [
        ...output,
        ...getLongestPath(input, row, column, numRows, numColumns, path)
      ];
    }
  }
  showLongestPath(output);
};

start(input);
