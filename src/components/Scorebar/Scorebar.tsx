import { observer } from "mobx-react-lite";
import styles from "./Scorebar.module.scss";

interface ScorebarProps {
  scores: { cross: number; zero: number };
}

export const Scorebar = observer(({ scores }: ScorebarProps) => {
  return (
    <div className={styles.scorebar}>
      <div className={styles.cross}></div>
      <h1 className={styles.score}>
        {scores.cross} : {scores.zero}
      </h1>
      <div className={styles.zero}></div>
    </div>
  );
});
