export class View {
  protected container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  render() {
    return this.container;
  }
}
