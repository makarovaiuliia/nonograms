import { BasePuzzle } from '../../types/types';
import createElement from '../../utils/utils';
import { IEvents } from '../base/eventEmitter';
import { View } from '../base/view';

export class GameMenu extends View {
  private levelChooseElement: HTMLElement;
  private gameChooseElement: HTMLElement = createElement('div', {
    className: 'game__choose',
  });
  private buttonContainer: HTMLElement;
  private events: IEvents;

  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    document.body.append(this.render());
    this.levelChooseElement = this.container.querySelector(
      '.game__choose-level'
    )!;
    this.buttonContainer = this.container.querySelector(
      '.game__button-container'
    )!;
    this.events = events;
    this.setEventListeners();
  }

  private setEventListeners() {
    this.levelChooseElement.addEventListener(
      'click',
      this.handleLevelChoose.bind(this)
    );

    this.gameChooseElement.addEventListener(
      'click',
      this.handleGameChoose.bind(this)
    );

    this.buttonContainer.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;
      console.log(target.id)
      if (target.classList.contains('button')) {
        switch (target.id) {
          case 'back':
            this.switchView(this.gameChooseElement, this.levelChooseElement);
            break;
          case 'continue':
            break;
          case 'random':
            
            break;
          default:
            break;
        }
      }
    });
  }

  private handleLevelChoose(event: Event) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('game__choose-list-item')) {
      this.events.emit('level-chosen', { level: target.id });
    }
  }

  private handleGameChoose(event: Event) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('game__choose-list-item')) {
      this.events.emit('game-chosen', { index: parseInt(target.id) });
    }
  }

  renderGames(games: BasePuzzle[]) {
    this.gameChooseElement.innerHTML = '';
    const list = createElement('ul', { className: 'game__choose-list' });
    games.forEach((game, index) => {
      const element = createElement('li', {
        classList: 'game__choose-list-item',
        id: index.toString(),
        textContent: game.name,
      });
      list.append(element);
    });
    this.gameChooseElement.append(list);
    this.switchView(this.levelChooseElement, this.gameChooseElement);
  }

  private switchView(oldView: HTMLElement, newView: HTMLElement) {
    oldView.remove();
    this.container.append(newView);
  }
}
