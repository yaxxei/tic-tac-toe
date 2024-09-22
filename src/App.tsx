import "./App.css";
import { Grid } from "@/components/Grid/Grid";
import { Scorebar } from "./components/Scorebar/Scorebar";
import { useStore } from "./store/rootStore";
import { Replay } from "./components/Replay/Replay";
import { observer } from "mobx-react-lite";
import type { Pos2D } from "./store/gameStore";

const App = observer(() => {
  const { gameStore } = useStore();

  function restartHandler() {
    gameStore.restart();
  }

  function makeMoveHandler(cell: Pos2D) {
    let mover = gameStore.getMover();
    gameStore.setSymbol(cell, mover);
  }

  return (
    <>
      {gameStore.gameState.isFinish && (
        <Replay
          winner={gameStore.getMover() === "cross" ? "zero" : "cross"}
          restart={restartHandler}
        />
      )}
      <div
        id="container"
        className={gameStore.gameState.isFinish ? "dimmed" : ""}
      >
        <Scorebar scores={gameStore.scores} />
        <Grid
          grid={gameStore.grid}
          gameState={gameStore.gameState}
          makeMove={makeMoveHandler}
        />
      </div>
    </>
  );
});

export default App;
