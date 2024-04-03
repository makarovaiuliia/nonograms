import { BasePuzzle } from '../../types/types';
import { IEvents } from '../base/eventEmitter';
import { View } from '../base/view';
import { GameBoard } from '../ui/gameBoard';

export class Game extends View {
  private boardContainer: HTMLElement;
  private events: IEvents;
  private buttonContainer: HTMLElement;
  private gameBoard: GameBoard | null = null;

  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this.events = events;
    this.boardContainer = this.container.querySelector('#gameBoard')!;
    this.buttonContainer = this.container.querySelector(
      '.game__button-container'
    )!;
    this.setEventListeners();
  }

  private setEventListeners() {
    this.buttonContainer.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;
      console.log(target.id);
      if (target.classList.contains('button')) {
        switch (target.id) {
          case 'back':
            this.events.emit('back:levels');
            break;
          case 'reset':
            this.gameBoard?.resetGame();
            break;
          case 'show':
            this.gameBoard?.showAnswer();
            break;
          case 'save':
            this.events.emit('game:save');
            break;
          default:
            break;
        }
      }
    });
  }

  createGameBoard(game: BasePuzzle, level: string) {
    this.boardContainer.innerHTML = '';
    const board = new GameBoard(this.boardContainer, game, level, this.events);
    this.gameBoard = board;
  }
}
