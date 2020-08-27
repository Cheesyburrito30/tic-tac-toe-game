import React from 'react'
import Square from '../square/Square'
import './Board.scss'

export type BoardProps = {
    squares: Array<string>
    onClick: (i: number) => void
    winner: string
}

let renderSquare = (i: number, { squares, onClick }: BoardProps) => {
    return <Square value={squares[i]} onClick={() => onClick(i)} />
}

const Board = (Props: BoardProps) => (
    <div className={`single-game-board ${Props.winner}`}>
        <div className="board-row">
            {renderSquare(0, Props)}
            {renderSquare(1, Props)}
            {renderSquare(2, Props)}
        </div>
        <div className="board-row">
            {renderSquare(3, Props)}
            {renderSquare(4, Props)}
            {renderSquare(5, Props)}
        </div>
        <div className="board-row">
            {renderSquare(6, Props)}
            {renderSquare(7, Props)}
            {renderSquare(8, Props)}
        </div>
    </div>
)
export default Board
