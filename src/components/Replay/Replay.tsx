import { ISymbol } from "@/store/gameStore";
import styles from "./Replay.module.scss";

interface ReplayProps {
  winner: Exclude<ISymbol, "">;
  restart: () => void;
}

export function Replay({ winner, restart }: ReplayProps) {
  return (
    <div className={styles.replay}>
      <h1>Winner</h1>
      <div
        className={`${winner === "cross" ? styles.cross : ""} ${
          winner === "zero" ? styles.zero : ""
        }`}
      ></div>
      <button onClick={restart}>Restart</button>
    </div>
  );
}
