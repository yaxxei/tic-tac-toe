import styles from "./Grid.module.scss";

import { Cell } from "@/components/Cell/Cell";
import { observer } from "mobx-react-lite";
import type { GameState, ICell, Pos2D } from "@/store/gameStore";

interface GridProps {
  grid: ICell[][];
  gameState: GameState;
  makeMove: (cell: Pos2D) => void;
}

export const Grid = observer(({ grid, gameState, makeMove }: GridProps) => {
  return (
    <table className={styles.grid}>
      <tbody>
        {grid.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => (
              <td key={colIndex}>
                <Cell
                  cell={cell}
                  makeMove={() => makeMove({ x: rowIndex, y: colIndex })}
                  gameState={gameState}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
});
