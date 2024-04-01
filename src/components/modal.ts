import { View } from './base/view';

export class Modal extends View {
  private closeButton: HTMLButtonElement;
  private content: HTMLElement;
  private winnerText: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);
    this.closeButton =
      this.container.querySelector<HTMLButtonElement>('.modal__close')!;
    this.content = this.container.querySelector('.modal__content')!;
    this.winnerText = this.container.querySelector('#modalText')!;

    this.closeButton.addEventListener('click', this.close.bind(this));
    this.container.addEventListener('click', this.close.bind(this));
    this.content.addEventListener('click', (event) => event.stopPropagation());
  }

  open() {
    this.container.classList.add('modal_is-opened');
  }

  close() {
    this.container.classList.remove('modal_is-opened');
  }

  setWinner(name: string, time: number) {
    this.winnerText.textContent = `The winner is ${name}. It completed the race with the time: ${time}`;
  }
}
