import React, { useState } from 'react';
import './App.css';

const initialBoard = [
  [5, 3, '', '', 7, '', '', '', ''],
  [6, '', '', 1, 9, 5, '', '', ''],
  ['', 9, 8, '', '', '', '', 6, ''],
  [8, '', '', '', 6, '', '', '', 3],
  [4, '', '', 8, '', 3, '', '', 1],
  [7, '', '', '', 2, '', '', '', 6],
  ['', 6, '', '', '', '', 2, 8, ''],
  ['', '', '', 4, 1, 9, '', '', 5],
  ['', '', '', '', 8, '', '', 7, 9],
];

const isValidMove = (board, row, col, value) => {
  // Check row for duplicates
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === value && i !== col) {
      return false; // Duplicate found in the row
    }
  }

  // Check column for duplicates
  for (let i = 0; i < 9; i++) {
    if (board[i][col] === value && i !== row) {
      return false; // Duplicate found in the column
    }
  }

  // Check the 3x3 grid for duplicates
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let r = startRow; r < startRow + 3; r++) {
    for (let c = startCol; c < startCol + 3; c++) {
      if (board[r][c] === value && (r !== row || c !== col)) {
        return false; // Duplicate found in the 3x3 grid
      }
    }
  }

  return true; // No duplicates found, valid move
};

const checkRowForAdjacentDuplicates = (board, row) => {
  const errors = [];
  const seen = {};

  for (let col = 0; col < 9; col++) {
    const value = board[row][col];
    if (value) {
      if (seen[value]) {
        errors.push({ rowIndex: row, colIndex: col });
        errors.push({ rowIndex: row, colIndex: seen[value] });
      } else {
        seen[value] = col;
      }
    }
  }

  return errors;
};

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [errors, setErrors] = useState([]);

  const handleChange = (rowIndex, colIndex, value) => {
    // Validate input as empty or a number between 1 and 9
    if (value === '' || /^[1-9]$/.test(value)) {
      const newBoard = board.map((row, rIndex) =>
        row.map((cell, cIndex) =>
          rIndex === rowIndex && cIndex === colIndex ? value : cell
        )
      );

      // Reset errors for the current cell
      const newErrors = errors.filter(
        (error) => error.rowIndex !== rowIndex || error.colIndex !== colIndex
      );

      // Validate the move and add to errors if invalid
      if (value !== '' && !isValidMove(newBoard, rowIndex, colIndex, value)) {
        newErrors.push({ rowIndex, colIndex });
      }

      // Check for adjacent duplicates in the row
      newErrors.push(...checkRowForAdjacentDuplicates(newBoard, rowIndex));

      setBoard(newBoard);
      setErrors(newErrors);
    }
  };

  const isError = (rowIndex, colIndex) => {
    return errors.some(
      (error) => error.rowIndex === rowIndex && error.colIndex === colIndex
    );
  };

  return (
    <div className="App">
      <h1>Sudoku</h1>
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <input
                key={colIndex}
                type="text"
                value={cell}
                onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                maxLength="1"
                className={isError(rowIndex, colIndex) ? 'error' : ''}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
