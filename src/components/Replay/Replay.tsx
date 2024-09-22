import { ISymbol } from "@/store/gameStore";
import styles from "./Replay.module.scss";

interface ReplayProps {
  winner: ISymbol;
  restart: () => void;
}

export function Replay({ winner, restart }: ReplayProps) {
  return (
    <div className={styles.replay}>
      {!winner.length && <h1>No winner</h1>}
      {winner.length > 0 && <h1>Winner</h1>}
      {winner.length > 0 && (
        <div
          className={`${winner === "cross" ? styles.cross : ""} ${
            winner === "zero" ? styles.zero : ""
          }`}
        ></div>
      )}
      <button onClick={restart}>Restart</button>
    </div>
  );
}
