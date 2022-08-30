import React, { useState } from 'react'
import { c4columns, c4rows } from './constants'
import GameRow from './GameRow'
import { Board } from './interfaces/Board'
import { Column } from './interfaces/Column'
import { Row } from './interfaces/Row'

const GameBoard: React.FC = (): JSX.Element => {
    const initialBoard: Board = {
        rows: Array.from({ length: c4rows }, (_, i) => ({
            columns: Array.from({ length: c4columns }, (_, i) => ({
                player: null
            }))
        }))
    }
    const [board, setBoard] = useState<Board>(initialBoard);
    const [currPlayer, setCurrPlayer] = useState<number>(1)
    const updateBoard = (columnIndex: number): void => {
        let boardCopy: Board = board
        let areColumnsFilled: boolean = true
        let rowIndex: number = 0 
        for(let i: number = 5;i >= 0;i--){
            let columnPlayer: number | null = boardCopy.rows[i].columns[columnIndex].player
            if(!columnPlayer){
                boardCopy.rows[i].columns[columnIndex].player = currPlayer
                areColumnsFilled = false
                rowIndex = i
                break;
            }
        }
        setBoard(boardCopy)
        if(!areColumnsFilled) {
            setCurrPlayer(currPlayer === 1 ? 2 : 1)
        }
        if(winCheck(rowIndex, columnIndex)) {
            setBoard(initialBoard)
            alert("Player " + currPlayer + " has won!")
            setCurrPlayer(1)
        } else if(drawCheck()) {
            setBoard(initialBoard)
            alert('It\'s a Draw')
            setCurrPlayer(1)
        }
    }

    const drawCheck = (): boolean => {
        let isBoardFilled: boolean = board.rows.filter((row: Row) => row.columns.filter((column: Column) => column.player === null).length > 0).length > 0 ? false : true
        return isBoardFilled
    }

    const winCheck = (rowIndex: number, columnIndex: number): boolean => {
        return (
        checkHorizontal(rowIndex, columnIndex) || 
        checkVertical(rowIndex, columnIndex) || 
        checkRightDiagonal(rowIndex, columnIndex) || 
        checkLeftDiagonal(rowIndex, columnIndex)
        )
    }

    const checkLeftDiagonal = (rowIndex: number, columnIndex: number): boolean => { 
        let consecColumn: number = 0
        let columnToStart: number = rowIndex
        let rowToStart: number = columnIndex
        for(let i: number = 0; i < c4rows; i++) {
            let column: Column = board.rows[rowIndex - i]?.columns[columnIndex + i]
            if(column) {
                columnToStart = columnIndex + i
                rowToStart = rowIndex + i
            } else {
                break
            }
        }
        for(let j: number = 0; j < c4rows; j++) {
            let column: Column = board.rows[rowToStart + j].columns[columnToStart - j]
            if(column) {
                if(column.player === board.rows[rowIndex].columns[columnIndex].player) {
                    consecColumn++
                    if(consecColumn >= 4) {
                        return true
                    }
                } else {
                    consecColumn = 0
                }
            }
        }
        return false
    }

    const checkRightDiagonal = (rowIndex: number, columnIndex: number): boolean => {
        let consecColumn: number = 0
        let indexDiff: number = rowIndex - columnIndex
        let columnToStart: number = 0
        let rowToStart: number = 0
        if(indexDiff > 0) {
            rowToStart = indexDiff
        } else if(indexDiff < 0 ) {
            columnToStart = Math.abs(indexDiff)
        }
        for(let i: number = 0; i < c4rows; i++) {
            let column: Column = board.rows[rowToStart + i]?.columns[columnToStart + i]
            if(column) {
                if(column.player === board.rows[rowIndex].columns[columnIndex].player) {
                    consecColumn++
                    if(consecColumn >= 4) {
                        return true 
                    }
                } else {
                    consecColumn = 0 
                }
            }
        }
        return false
    }

    const checkVertical = (rowIndex: number, columnIndex: number): boolean => {
        let row: Row = board.rows[rowIndex]
        let consecColumn: number = 0
        for(let i: number = 0; i < c4rows; i++) {
            if(board.rows[i].columns[columnIndex].player === row.columns[columnIndex].player) {
                consecColumn++
                if(consecColumn >= 4) {
                    return true
                }
            } else {
                consecColumn = 0 
            }
        }
        return false
    }

    const checkHorizontal = (rowIndex: number, columnIndex: number): boolean => {
        let row: Row = board.rows[rowIndex]
        let consecColumn: number = 0
        for(let i: number = 0; i < c4columns; i++) {
            if(row.columns[i].player === row.columns[columnIndex].player) {
                consecColumn++
                if(consecColumn >= 4) {
                    return true
                }
            } else {
                consecColumn = 0
            }
        }

        return false
    }
        return (
            <>
                <button className="button" onClick={(): void => {
                    setBoard(initialBoard)
                    setCurrPlayer(1)
                }}> 
                New Game
                </button>
                <table>
                    <tbody>
                    {board.rows.map((row: Row, i: number): JSX.Element => (<GameRow key={i} row={row} updateBoard={updateBoard}/>))}
                    </tbody>
                </table>
                
            </>
        )
    }

export default GameBoard