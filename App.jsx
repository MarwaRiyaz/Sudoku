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
  ['', '', '', '', 8, '', '', 7, 9]
];

const App = () => {
  const [board, setBoard] = useState(initialBoard);

  const handleChange = (rowIndex, colIndex, value) => {
    const newBoard = board.map((row, rIndex) =>
      row.map((cell, cIndex) => (rIndex === rowIndex && cIndex === colIndex ? value : cell))
    );
    setBoard(newBoard);
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
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
