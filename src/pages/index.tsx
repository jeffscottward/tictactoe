/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import Layout from '../components/Layout'
import { useState } from 'react'

const Index = () => {
  const [currentPlayer, setCurrentPlayer] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [tie, setTie] = useState(false)
  const [score, setScore] = useState([0, 0])
  const [board, setBoard] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ])

  const reset = () => {
    setCurrentPlayer(false)
    setGameOver(false)
    setTie(false)
    setBoard([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ])
  }

  function nullCheck(arr, search) {
    return arr.some((row) => row.includes(search))
  }

  const handleSelection = (e: React.BaseSyntheticEvent) => {
    e.preventDefault()

    let boxCoord = String(e.target.id)
    let X = boxCoord.substring(0, 1)
    let Y = boxCoord.substring(1, 2)

    if (board[X][Y] === null) {
      // Player 1
      let newBoardState = board
      if (currentPlayer === false) {
        newBoardState[X][Y] = 'X'
        setBoard(newBoardState)
      }
      if (currentPlayer === true) {
        newBoardState[X][Y] = 'O'
        setBoard(newBoardState)
      }
      let didSomeoneWin = checkForWinner()
      if (didSomeoneWin) {
        setGameOver(true)
        let currentScore = score
        if (currentPlayer === false) {
          currentScore[0] += 1
        }
        if (currentPlayer === true) {
          currentScore[1] += 1
        }
        setScore(score)
      } else {
        // If still some spaces
        if (nullCheck(board, null) === true ) {
          setCurrentPlayer(!currentPlayer)
        } // If no more spaces
        if (nullCheck(board, null) === false ) {
          // Tie game
          setTie(true)
          setGameOver(true)
        }
      }
    }
  }

  const checkForWinner = () => {
    // Checks each direction for a winner
    // Boxes must all equal each other and not be null
    // ROWS
    if (
      // ROWS
      (board[0][0] !== null &&
        board[0][0] === board[1][0] &&
        board[1][0] === board[2][0]) ||
      (board[0][1] !== null &&
        board[0][1] === board[1][1] &&
        board[1][1] === board[2][1]) ||
      (board[0][2] !== null &&
        board[0][2] === board[1][2] &&
        board[1][2] === board[2][2]) ||
      // COLUMNS
      (board[0][0] !== null &&
        board[0][0] === board[0][1] &&
        board[0][1] === board[0][2]) ||
      (board[1][0] !== null &&
        board[1][0] === board[1][1] &&
        board[1][1] === board[1][2]) ||
      (board[2][0] !== null &&
        board[2][0] === board[2][1] &&
        board[2][1] === board[2][2]) ||
      // DIAGNONALS
      (board[0][0] !== null &&
        board[0][0] === board[1][1] &&
        board[1][1] === board[2][2]) ||
      (board[2][0] !== null && board[2][0] === board[1][1] && board[1][1] === board[0][2])
    ) {
      return true
    }
    return false
  }

  let playerIndicator = !currentPlayer ? '1' : '2'

  return (
    <Layout>
      <div>
        <b>Current Player: </b> {playerIndicator}
      </div>
      <div>
        <div>
          <b>Score X (P1):</b> {score[0]}
        </div>
        <div>
          <b>Score O (P2):</b> {score[1]}
        </div>
      </div>
      <div>
        <table>
          <tbody>
            <tr>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        {tie && <b>Tie! &nbsp;</b>}
        {!tie && gameOver && <b>Winer: {playerIndicator}!</b>}
        {gameOver && playerIndicator && <button onClick={reset}>Play again?</button>}
      </div>
      <table
        className="tic-tac-toe"
        sx={{
          border: '1px solid black',
          width: '300px',
          height: '300px',
          td: {
            border: '1px solid black',
            width: '100px',
            height: '100px',
            textAlign: 'center',
            fontSize: '3rem',
            cursor: 'pointer',
          },
        }}
      >
        <tbody>
          {board.map((row, Y) => (
            <tr key={'r' + Y} id={'r' + Y}>
              {row.map((box, X) => (
                <td
                  key={String(X) + String(Y)}
                  id={String(X) + String(Y)}
                  onClick={handleSelection}
                >
                  {board[X][Y]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}

export default Index
