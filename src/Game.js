import React from 'react';

function Square(props) {
  return (
    <button className= {`square ${props.isWinLine ? "highlight" : ""}`} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function compareFunc(a, b) {
  return a - b;
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
  ];
  let winLine = [];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      winLine = winLine.concat(lines[i]);
    }
  }
  if (winLine.length) {
    winLine = winLine.filter((x, i, self) => self.indexOf(x) === i);
    winLine.sort(compareFunc);
    return {
      winner: squares[winLine[0]],
      winLine: winLine,
    };
  }
  return {
    winner: null,
    winLine: null,
  };
}

class Board extends React.Component {
  renderSquare({index, isWinLine} = {}) {
    return (
      <Square
        key = {index}
        value = {this.props.squares[index]}
        onClick = {() => this.props.onClick(index)}
        isWinLine = {isWinLine}
      />
    );
  }

  render() {
    let board = [];

    let index = 0;
    for (let i = 0; i < 9; i++) {
      if ([0, 3, 6].includes(i)) {
        board.push(<div className="board-row" key={`b_${i}`}></div>)
      }

      if (this.props.winLine && i === this.props.winLine[index]) {
        board.push(this.renderSquare({index: i, isWinLine: true}));
        index++;
      } else {
        board.push(this.renderSquare({index: i, isWinLine: false}));
      }
    }

    return (
      <div>{board}</div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        col: null,
        row: null,
      }],
      isHistoryDescending: false,
      stepNumber: 0,
      xIsNext: true,
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const col = Math.floor(i / 3);
    const row = i % 3;

    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        col: col,
        row: row,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  sortHistory() {
    this.setState({
      isHistoryDescending: !this.state.isHistoryDescending,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winInfo = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const col = step.col;
      const row = step.row;
      let desc = move ?
        'Go to #' + move +'(' + col + ',' + row + ')':
        'Go to game start';
      if (this.state.stepNumber === move) {
        desc = <b>{desc}</b>
      }

      return (
        <li key={move}>
          <button onClick = {() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winInfo.winner) {
      status = 'Winner: ' + winInfo.winner;
    } else if (this.state.stepNumber === 9) {
      status = 'Draw';
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares = {current.squares}
            onClick = {(i) => this.handleClick(i)}
            winLine = {winInfo.winLine}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div><button onClick = {() => this.sortHistory()}>表示切り替え</button></div>
          {this.state.isHistoryDescending ? <ol reversed="reversed">{moves.reverse()}</ol> : <ol>{moves}</ol>}
        </div>
      </div>
    );
  }
}

export default Game
