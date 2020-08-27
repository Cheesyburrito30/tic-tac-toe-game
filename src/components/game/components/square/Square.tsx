import React from 'react'
import './Square.scss'

type SquareProps = {
    value: string
    onClick: () => void
}

const Square = ({ value, onClick }: SquareProps) => (
    <button className="square" onClick={onClick}>
        {value}
    </button>
)

export default Square
