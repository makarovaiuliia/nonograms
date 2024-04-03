import { generateClues } from '../../js files/generateClues';
import { BasePuzzle } from '../../types/types';
import { generateGrid } from '../../utils/utils';
import { IEvents } from '../base/eventEmitter';
import { View } from '../base/view';
import clickCell from '../../assets/audio/click-sound.mp3';
import { gameBoard } from '../elements';

export interface IGameBoard {}

// const clickCellSound = new Audio(clickCell);

export class GameBoard extends View implements IGameBoard {
  events: IEvents;
  gameSolution: number[][];
  gameName: string;
  gameLevel: string;
  gameClues: { rowClues: number[][]; columnClues: number[][] };
  gameGrid: HTMLElement;

  constructor(
    container: HTMLElement,
    game: BasePuzzle,
    level: string,
    events: IEvents
  ) {
    super(container);
    this.events = events;
    this.gameLevel = level;
    this.gameSolution = game.solution;
    this.gameName = game.name;
    this.gameClues = generateClues(this.gameSolution);
    this.gameGrid = generateGrid(this.gameSolution, this.gameClues);
    this.container.append(this.gameGrid);

    this.gameGrid.addEventListener(
      'click',
      () => {
        this.events.emit('game:start'); // TODO: начать таймер
        this.gameGrid.addEventListener(
          'click',
          this.handleLeftClick.bind(this)
        );
        this.gameGrid.addEventListener(
          'contextmenu',
          this.handleRightClick.bind(this)
        );
      },
      { once: true }
    );

    this.gameGrid.addEventListener('click', this.handleClueClick.bind(this));
  }

  createGameBoard() {}

  startGame() {}

  handleRightClick(event: Event) {
    event.preventDefault();
    const cell = event.target as HTMLElement;

    if (cell.classList.contains('game__cell')) {
      // clickCellSound.play(); // TODO: вынести в ивент
      // const rowIndex = cell.parentNode.rowIndex - maxColHints;
      // const colIndex = cell.cellIndex - maxRowHints;
      cell.classList.toggle('game__cell-crossed');

      // if (cell.classList.contains('game__cell-active')) {
      //   cell.classList.remove('game__cell-active');
      //   currentGameSolution[rowIndex][colIndex] === 1
      //     ? (currentGameState[rowIndex][colIndex] = 'unfilled')
      //     : (currentGameState[rowIndex][colIndex] = 'empty');
      // }
    }
  }

  handleLeftClick(event: Event) {
    const cell = event.target as HTMLElement;
    if (cell.classList.contains('game__cell')) {
      if (cell.classList.contains('game__cell-crossed')) {
        cell.classList.remove('game__cell-crossed');
      }
      cell.classList.toggle('game__cell-active');

      // const rowIndex = cell.parentNode.rowIndex - maxColHints;
      // const colIndex = cell.cellIndex - maxRowHints;

      // currentGameState[rowIndex][colIndex] = cell.classList.contains(
      //   'game__cell-active'
      // )
      //   ? 'filled'
      //   : 'unfilled';

      // if (checkWin()) {
      //   if (sound) winGameSound.play();
      //   changeStateOfTimer();
      //   showPopup(gameTimer.textContent.split(':'));
      //   deleteSavedGameState();
      // }
    }
  }

  handleClueClick(event: Event) {
    const target = event.target as HTMLElement;
    if (
      target.classList.contains('game__clue-cell') &&
      target.textContent !== ''
    ) {
      // clickCellSound.play(); // TODO: вынести в ивент
      target.classList.toggle('game__clue-cell-crossed');
    }
  }

  resetGame() {
    const currentGameGrid = this.gameGrid.querySelectorAll('.game__cell');

    currentGameGrid.forEach((cell) => {
      cell.classList.remove('game__cell-active', 'game__cell-crossed');
    });

    this.events.emit('game:reset');
    //TODO:
    // for (let i = 0; i < currentGameState.length; i++) {
    //   for (let j = 0; j < currentGameState[i].length; j++) {
    //     if (currentGameState[i][j] === 'filled') {
    //       currentGameState[i][j] =
    //         currentGameSolution[i][j] === 1 ? 'unfilled' : 'empty';
    //     }
    //   }
    // }
  }

  showAnswer() {
    const currentGameGrid = gameBoard.querySelectorAll('.game__cell');
    this.gameSolution.flat().forEach((cell, index) => {
      if (cell === 1) {
        currentGameGrid[index].classList.add('game__cell-active');
      }
      if (
        cell === 0 &&
        currentGameGrid[index].classList.contains('game__cell-active')
      ) {
        currentGameGrid[index].classList.remove('game__cell-active');
      }
      if (currentGameGrid[index].classList.contains('game__cell-crossed')) {
        currentGameGrid[index].classList.remove('game__cell-crossed');
      }
    });
    this.events.emit('game:showAnswer');

    // changeStateOfTimer();
    // setTimeout(showPopup, 2000);
  }
}
// currentGameState = gameSolution.map((row) =>
//   row.map((cell) => (cell === 1 ? 'unfilled' : 'empty'))
// );
