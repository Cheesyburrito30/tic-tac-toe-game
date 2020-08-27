import React, { useState } from 'react'
import Game from '../game/Game'
import Chat from '../chat/Chat'

import './App.scss'

function App() {
    const [winner, setWinner] = useState({ gameNumber: 0, winner: '' }),
        [newGame, setNewGame] = useState<number>(0),
        handleGameWon = (winner: { gameNumber: number; winner: string }) => {
            setWinner(winner)
        },
        handleNewGame = () => {
            setNewGame(newGame + 1)
        }

    return (
        <div className="App">
            <header className="App-header">
                <div className="row">
                    <Game onGameWon={handleGameWon} onNewGame={handleNewGame} />
                    <Chat gameWon={winner} newGame={newGame} />
                </div>
            </header>
        </div>
    )
}

export default App
