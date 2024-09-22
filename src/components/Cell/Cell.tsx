import type { GameState, ICell } from "@/store/gameStore";
import styles from "./Cell.module.scss";
import { observer } from "mobx-react-lite";

interface CellProps {
  cell: ICell;
  makeMove: () => void;
  gameState: GameState;
}

export const Cell = observer(({ cell, makeMove, gameState }: CellProps) => {
  const isCross = cell.symbol === "cross";
  const isZero = cell.symbol === "zero";
  const isPlaced = cell.symbol.length;
  const isWin = cell.isWin;
  return (
    <button
      className={`${styles.cell} ${isPlaced ? styles.placed : ""} ${
        isWin ? styles.win : ""
      } ${isCross ? styles.cross : ""} ${isZero ? styles.zero : ""}`}
      onClick={makeMove}
      disabled={gameState.isFinish}
    ></button>
  );
});
