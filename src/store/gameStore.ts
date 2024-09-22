import { makeAutoObservable } from "mobx";

export type ISymbol = "" | "cross" | "zero";

export interface ICell {
  symbol: ISymbol;
  isWin: boolean;
}

export type Pos2D = { x: number; y: number };

export interface IScores {
  cross: number;
  zero: number;
}

interface NotFinished {
  isFinish: false;
}

interface Finished {
  isFinish: true;
  winner: ISymbol;
}

export type GameState = NotFinished | Finished;

export class GameStore {
  size = 3;

  grid: ICell[][] = Array.from({ length: this.size }, () =>
    Array.from({ length: this.size }, () => ({
      symbol: "",
      isWin: false,
    }))
  );

  gameState: GameState = { isFinish: false };

  scores: IScores = {
    cross: 0,
    zero: 0,
  };

  constructor() {
    makeAutoObservable(this);
  }

  setSymbol(pos: { x: number; y: number }, symbol: ISymbol) {
    if (!symbol.length) return;
    if (this.grid[pos.x][pos.y].symbol.length) return;
    this.grid[pos.x][pos.y].symbol = symbol;
    this.isFinishByCell(pos);
  }

  incrementScore(symbol: Exclude<ISymbol, "">) {
    this.scores[symbol]++;
  }

  restart() {
    this.gameState = { isFinish: false };
    this.grid = this.grid.map((row) =>
      row.map(() => ({ symbol: "", isWin: false }))
    );
  }

  getMover(): Exclude<ISymbol, ""> {
    let crossCount = 0;
    let zeroCount = 0;
    this.grid.forEach((col) =>
      col.forEach((cell) => {
        if (cell.symbol === "cross") crossCount++;
        if (cell.symbol === "zero") zeroCount++;
      })
    );
    return crossCount === zeroCount ? "cross" : "zero";
  }

  isFinishByCell(cell: Pos2D): boolean {
    const row = this.grid[cell.x];
    const col = this.grid.map((row) => row[cell.y]);

    const diagonalCells = [
      this.grid.map((_, i) => this.grid[i][i]),
      this.grid.map((_, i) => this.grid[i][this.size - 1 - i]),
    ];

    const checkWin = (cells: ICell[]) => {
      const isCrossWin = cells.every((cell) => cell.symbol === "cross");
      const isZeroWin = cells.every((cell) => cell.symbol === "zero");

      if (isCrossWin || isZeroWin) {
        cells.forEach((c) => (c.isWin = true));
        return true;
      }
      return false;
    };

    const isWin =
      checkWin(row) || checkWin(col) || diagonalCells.some(checkWin);
    if (isWin) {
      const winner = this.getMover() === "cross" ? "zero" : "cross";
      this.gameState = { isFinish: true, winner };
      this.incrementScore(winner);
      return true;
    } else if (this.grid.flat().every((c) => c.symbol.length)) {
      this.gameState = { isFinish: true, winner: "" };
      return true;
    }
    return false;
  }
}
