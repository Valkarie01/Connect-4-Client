import React, { useState } from 'react'
import { c4columns, c4rows } from './constants'
import GameRow from './GameRow'
import { Board } from './interfaces/Board'
import { Row } from './interfaces/Row'

const GameBoard: React.FC = (): JSX.Element => {
    const initialBoard: Board = {
        rows: Array.from({length: c4rows}, (_, i) => ({
            columns: Array.from({length: c4columns}, (_, i) => ({
                player: null
            }))
        }))
    }
    const [board, setBoard] = useState(initialBoard)
        return (
            <>
                <button className="button">New Game</button>
                <table>
                    <tbody>
                    {board.rows.map((row: Row, i: number): JSX.Element => (<GameRow key={i} row={row}/>))}
                    </tbody>
                </table>
                
            </>
        )
    }

export default GameBoard