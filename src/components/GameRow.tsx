import React from "react";
import GameColumn from "./GameColumn";
import { Column } from "./interfaces/Column";
import { Row } from "./interfaces/Row"

interface Props {
    row: Row
}
const GameRow: React.FC<Props> = ({row}: Props): JSX.Element => {
    return (
        <tr>
            {row.columns.map((column: Column, i: number): JSX.Element => (<GameColumn key={i} columnIndex={i} />))}
        </tr>
    )
}

export default GameRow