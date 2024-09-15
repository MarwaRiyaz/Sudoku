import React, { useState } from 'react';
import './App.css';

// Initial Sudoku Board
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

// Function to check if a number is valid in the current row, column, and 3x3 grid
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

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [errors, setErrors] = useState([]);

  const handleChange = (rowIndex, colIndex, value) => {
    const newBoard = board.map((row, rIndex) =>
      row.map((cell, cIndex) =>
        rIndex === rowIndex && cIndex === colIndex ? value : cell
      )
    );

    // Validate the move and ensure the input is a valid number or empty
    if (value === '' || (value >= '1' && value <= '9')) {
      if (value !== '' && !isValidMove(newBoard, rowIndex, colIndex, value)) {
        setErrors((prevErrors) => [
          ...prevErrors,
          { rowIndex, colIndex },
        ]);
      } else {
        setErrors((prevErrors) =>
          prevErrors.filter(
            (error) =>
              error.rowIndex !== rowIndex || error.colIndex !== colIndex
          )
        );
      }

      setBoard(newBoard);
    } else {
      // Invalid input (non-digit or not within the allowed range)
      setErrors((prevErrors) => [
        ...prevErrors,
        { rowIndex, colIndex },
      ]);
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
                onChange={(e) =>
                  handleChange(rowIndex, colIndex, e.target.value)
                }
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
