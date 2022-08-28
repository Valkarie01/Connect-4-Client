import React from "react";
import { Column } from "./interfaces/Column";

interface Props {
    columnIndex: number
    column: Column
}

const GameColumn: React.FC<Props> = (columnIndex, column: Props): JSX.Element => {
    let tileStatus = 'open'

    if(column.player === 1) {
        tileStatus = "player1"
    } else if(column.player === 2 ) {
        tileStatus = "player2"
    }
    return (
    <td>
        <div className="tile">
            <div className={[tileStatus, "circle"].join(" ")}>

            </div>
        </div>
    </td>
    )
}

export default GameColumn