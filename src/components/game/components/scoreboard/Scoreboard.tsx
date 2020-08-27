import React from 'react'
import './Scoreboard.scss'

export type ScoreboardProps = {
    x: number
    o: number
}

const Scoreboard = ({ x, o }: ScoreboardProps) => {
    return (
        <div className="game-scoreboard">
            <div className={`score-ticker ${x > o ? 'winning' : ''}`}>
                <div className="ticker-title">X</div>
                <div className="ticker-body">{x}</div>
            </div>
            <div className={`score-ticker ${o > x ? 'winning' : ''}`}>
                <div className="ticker-title">O</div>
                <div className="ticker-body">{o}</div>
            </div>
        </div>
    )
}

export default Scoreboard
