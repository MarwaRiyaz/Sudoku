import React, { useState, useEffect } from 'react';

const initialBoard = [
  [5, 3, '', '', 7, '', '', 4, ''],
  [6, '', '', 1, 9, 5, '', '', ''],
  ['', 9, 8, '', '', '', '', 6, ''],
  [8, '', '', '', 6, '', '', '', 3],
  [4, '', '', 8, '', 3, '', '', 1],
  [7, '', '', '', 2, '', '', '', 6],
  [2, 6, '', '', '', '', 2, 8, ''],
  [1, '', 2, 4, 1, 9, '', '', 5],
  ['', 4, '', '', 8, '', '', 7, 9],
];

const SudokuGame = () => {
  const [board, setBoard] = useState(initialBoard);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    checkAllErrors(board);
  }, []);

  const checkAllErrors = (currentBoard) => {
    const newErrors = [];
    for (let i = 0; i < 9; i++) {
      newErrors.push(...checkUnit(currentBoard, i, 'row'));
      newErrors.push(...checkUnit(currentBoard, i, 'column'));
      newErrors.push(...checkUnit(currentBoard, i, 'grid'));
    }
    setErrors(newErrors);
  };

  const checkUnit = (currentBoard, index, unitType) => {
    const unitErrors = [];
    const seen = {};
    for (let i = 0; i < 9; i++) {
      let value, position;
      if (unitType === 'row') {
        value = currentBoard[index][i];
        position = { row: index, col: i };
      } else if (unitType === 'column') {
        value = currentBoard[i][index];
        position = { row: i, col: index };
      } else {
        const row = Math.floor(index / 3) * 3 + Math.floor(i / 3);
        const col = (index % 3) * 3 + (i % 3);
        value = currentBoard[row][col];
        position = { row, col };
      }
      if (value !== '') {
        if (seen[value]) {
          unitErrors.push(position);
          unitErrors.push(seen[value]);
        } else {
          seen[value] = position;
        }
      }
    }
    return unitErrors;
  };

  const handleChange = (rowIndex, colIndex, value) => {
    if (value === '' || /^[1-9]$/.test(value)) {
      const newBoard = board.map((row, rIndex) =>
        row.map((cell, cIndex) =>
          rIndex === rowIndex && cIndex === colIndex ? value : cell
        )
      );
      setBoard(newBoard);
      checkAllErrors(newBoard);
    }
  };

  const isError = (rowIndex, colIndex) => {
    return errors.some(error => error.row === rowIndex && error.col === colIndex);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ color: 'red' }}>SUDOKU</h1>
      <div style={{ display: 'inline-block', border: '2px solid black' }}>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex' }}>
            {row.map((cell, colIndex) => (
              <input
                key={colIndex}
                type="text"
                value={cell}
                onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                maxLength="1"
                style={{
                  width: '30px',
                  height: '30px',
                  textAlign: 'center',
                  border: '1px solid black',
                  backgroundColor: isError(rowIndex, colIndex) ? 'pink' : 'white',
                  color: initialBoard[rowIndex][colIndex] === '' ? 'blue' : 'black',
                }}
                readOnly={initialBoard[rowIndex][colIndex] !== ''}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SudokuGame;