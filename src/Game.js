import React, { useState } from "react"
import PropTypes from "prop-types"

Square.propTypes = {
  isWinLine: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

Board.propTypes = {
  squares: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  winLine: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  isWinLine: PropTypes.bool.isRequired,
}

function Square(props) {
  return (
    <button className={`square ${props.isWinLine ? "highlight" : ""}`} onClick={props.onClick}>
      {props.value}
    </button>
  )
}

function compareFunc(a, b) {
  return a - b
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  let winLine = []
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      winLine = winLine.concat(lines[i])
    }
  }
  if (winLine.length) {
    winLine = winLine.filter((x, i, self) => self.indexOf(x) === i)
    winLine.sort(compareFunc)
    return {
      winner: squares[winLine[0]],
      winLine,
    }
  }
  return {
    winner: null,
    winLine: null,
  }
}

function Board(props) {
  const renderSquare = ({ index, isWinLine } = {}) => {
    return (
      <Square
        key={index}
        value={props.squares[index]}
        onClick={() => props.onClick(index)}
        isWinLine={isWinLine}
      />
    )
  }

  let board = []

  let index = 0
  for (let i = 0; i < 9; i++) {
    if ([0, 3, 6].includes(i)) {
      board.push(<div className="board-row" key={`b_${i}`}></div>)
    }

    if (props.winLine && i === props.winLine[index]) {
      board.push(renderSquare({ index: i, isWinLine: true }))
      index++
    } else {
      board.push(renderSquare({ index: i, isWinLine: false }))
    }
  }

  return <div>{board}</div>
}

function Game() {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
      col: null,
      row: null,
    },
  ])
  const [isHistoryDescending, setIsHistoryDescending] = useState(false)
  const [stepNumber, setStepNumber] = useState(0)
  const [xIsNext, setXIsNext] = useState(true)

  const handleClick = i => {
    const newHistory = history.slice(0, stepNumber + 1)
    const current = newHistory[newHistory.length - 1]
    const squares = current.squares.slice()
    const col = Math.floor(i / 3)
    const row = i % 3

    if (calculateWinner(squares).winner || squares[i]) {
      return
    }
    squares[i] = xIsNext ? "X" : "O"
    setHistory(
      newHistory.concat([
        {
          squares,
          col,
          row,
        },
      ])
    )
    setStepNumber(newHistory.length)
    setXIsNext(!xIsNext)
  }

  const jumpTo = step => {
    setStepNumber(step)
    setXIsNext(step % 2 === 0)
  }

  const sortHistory = () => {
    setIsHistoryDescending(!isHistoryDescending)
  }

  const current = history[stepNumber]
  const winInfo = calculateWinner(current.squares)

  const moves = history.map((step, move) => {
    const col = step.col
    const row = step.row
    let desc = move ? `Go to #${move} (${col},${row})` : "Go to game start"
    if (stepNumber === move) {
      desc = <b>{desc}</b>
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    )
  })

  let status
  if (winInfo.winner) {
    status = `Winner: ${winInfo.winner}`
  } else if (stepNumber === 9) {
    status = "Draw"
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={i => handleClick(i)} winLine={winInfo.winLine} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <div>
          <button onClick={() => sortHistory()}>表示切り替え</button>
        </div>
        {isHistoryDescending ? <ol reversed="reversed">{moves.reverse()}</ol> : <ol>{moves}</ol>}
      </div>
    </div>
  )
}

export default Game
