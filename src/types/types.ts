export interface BasePuzzle {
  name: string;
  solution: number[][];
}

type EasyPuzzle = BasePuzzle & {
  solution: [number, number, number, number, number][];
};

type MediumPuzzle = BasePuzzle & {
  solution: [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
  ][];
};

type HardPuzzle = BasePuzzle & {
  solution: [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
  ][];
};

export interface Puzzles {
  easy: EasyPuzzle[];
  medium: MediumPuzzle[];
  hard: HardPuzzle[];
}

export type Level = 'easy' | 'medium' | 'hard'