import React from "react";
import GameColumn from "./GameColumn";
import { Column } from "./interfaces/Column";
import { Row } from "./interfaces/Row"

interface Props {
    row: Row;
    updateBoard: (columnIndex: number) => void;
}
const GameRow: React.FC<Props> = ({row, updateBoard}: Props): JSX.Element => {
    return (
        <tr>
            {row.columns.map((column: Column, i: number): JSX.Element => (<GameColumn key={i} columnIndex={i} updateBoard={updateBoard} column={column} player={0}/>))}
        </tr>
    )
}

export default GameRow