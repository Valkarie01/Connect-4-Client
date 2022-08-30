import React, { useState } from 'react'
import { c4columns, c4rows } from './constants'
import GameRow from './GameRow'
import { Board } from './interfaces/Board'
import { Row } from './interfaces/Row'

const GameBoard: React.FC = (): JSX.Element => {
    const initialBoard: Board = {
        rows: Array.from({ length: c4rows }, (_, i) => ({
            columns: Array.from({ length: c4columns }, (_, i) => ({
                player: null
            }))
        }))
    };
    const [board, setBoard] = useState<Board>(initialBoard);
    const [currPlayer, setCurrPlayer] = useState<number>(1)
    const updateBoard = (columnIndex: number): void => {
        let boardCopy: Board = board
        let areColumnsFilled: boolean = true
        for(let i: number = 5;i >= 0;i--){
            let columnPlayer: number | null = boardCopy.rows[i].columns[columnIndex].player
            if(!columnPlayer){
                boardCopy.rows[i].columns[columnIndex].player = currPlayer
                areColumnsFilled = false
                break;
            }
        }
        setBoard(boardCopy)
        if(!areColumnsFilled) {
            setCurrPlayer(currPlayer === 1 ? 2 : 1)
        }
    }
        return (
            <>
                <button className="button">New Game</button>
                <table>
                    <tbody>
                    {board.rows.map((row: Row, i: number): JSX.Element => (<GameRow key={i} row={row} updateBoard={updateBoard}/>))}
                    </tbody>
                </table>
                
            </>
        )
    }

export default GameBoard