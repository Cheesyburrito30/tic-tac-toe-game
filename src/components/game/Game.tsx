import React, { useRef } from 'react'
import Board, { BoardProps } from './components/board/Board'
import Scoreboard, { ScoreboardProps } from './components/scoreboard/Scoreboard'
import './Game.scss'

type GameInfo = {
    gameNumber: number
    winner: string
}

type GameProps = {
    onGameWon: ({ gameNumber, winner }: GameInfo) => void
    onNewGame: () => void
}

const Game = ({ onGameWon, onNewGame }: GameProps) => {
    const [squares, setSquares] = React.useState<Array<string>>(Array(9).fill(null)),
        [pastGames, setPastGames] = React.useState<BoardProps[]>([]),
        [playerScores, setPlayerScores] = React.useState<ScoreboardProps>({ x: 0, o: 0 }),
        [xIsNext, toggleNext] = React.useState(true),
        winner = useRef<string>(''),
        reset = () => {
            const archiveGame: BoardProps = {
                squares: squares,
                onClick: console.log,
                winner: winner.current || 'scratch',
            }
            setSquares(Array(9).fill(null))
            toggleNext(true)
            setPastGames((pg) => [...pg, archiveGame])
            winner.current = ''
            onNewGame()
        },
        calculateWinner = (squares: Array<string>) => {
            const lines: Array<[number, number, number]> = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6],
            ]
            for (let i = 0; i < lines.length; i++) {
                const [a, b, c] = lines[i]
                if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                    winner.current = squares[a].toLowerCase()
                    onGameWon({ gameNumber: Math.random(), winner: winner.current })
                    winner.current === 'x' ? (playerScores.x += 1) : (playerScores.o += 1)
                    setPlayerScores(playerScores)
                    return squares[a]
                }
            }
            return null
        },
        handleSquareClick = (i: number) => {
            if (winner.current !== '' || squares[i]) return
            squares[i] = xIsNext ? 'X' : 'O'
            setSquares(squares)
            toggleNext(!xIsNext)
            calculateWinner(squares)
            if (squares.every((x) => x !== null)) reset()
        }
    let status: string
    if (winner.current !== '') {
        status = `Winner: ${winner.current}`
    } else {
        status = `${xIsNext ? 'X' : 'O'}'s turn`
    }
    return (
        <div className="game">
            <Scoreboard x={playerScores.x} o={playerScores.o} />
            <div className="game-info">
                <p>{status}</p>
            </div>
            <div className="game-board">
                <div className={`gameWon ${winner.current !== ''}`} onClick={() => reset()}>
                    {winner.current.toUpperCase()} <br />
                    WON!
                    <small>click to play again!</small>
                </div>
                <div className="past-game-boards">
                    {pastGames.map((game, i) => {
                        return <Board key={i} squares={game.squares} winner={game.winner} onClick={() => {}} />
                    })}
                </div>
                <Board squares={squares} onClick={(i) => handleSquareClick(i)} winner={winner.current} />
            </div>
        </div>
    )
}
export default Game
