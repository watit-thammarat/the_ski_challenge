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

const getColumn = (input, currentValue, row, column, numColumns, data) => {
  if (column >= 0 && column < numColumns && currentValue > input[row][column]) {
    data.push({ row, column });
  }
};

const getRow = (
  input,
  currentValue,
  row,
  column,
  numRows,
  numColumns,
  data,
  isCurrentRow = false
) => {
  if (row >= 0 && row < numRows) {
    getColumn(input, currentValue, row, column - 1, numColumns, data);
    if (!isCurrentRow) {
      getColumn(input, currentValue, row, column, numColumns, data);
    }
    getColumn(input, currentValue, row, column + 1, numColumns, data);
  }
};

const getAllPossibleNextPoints = (input, row, column, numRows, numColumns) => {
  const data = [];
  const currentValue = input[row][column];
  getRow(input, currentValue, row - 1, column, numRows, numColumns, data);
  getRow(
    input,
    currentValue,
    row,
    column,
    numRows,
    numColumns,
    data,
    (isCurrentRow = true)
  );
  getRow(input, currentValue, row + 1, column, numRows, numColumns, data);
  return data;
};

const displayLongestPath = output => {
  let maxLength = 0;
  let value = [];
  for (const o of output) {
    if (o.length > maxLength) {
      value = [o];
      maxLength = o.length;
    } else if (o.length === maxLength) {
      value.push(o);
    }
  }
  return value.length === 1 ? value[0] : value;
};

const getLongestPath = (input, row, column, numRows, numColumns, path) => {
  const nextPoints = getAllPossibleNextPoints(
    input,
    row,
    column,
    numRows,
    numColumns
  );
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

const showLongestPath = output => {
  console.log('********************* RESULT *************************');
  console.log();
  console.log(displayLongestPath(output));
  console.log();
  console.log('******************************************************');
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
