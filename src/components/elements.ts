import createElement from '../utils/utils';

export const gameSettingsMenu = createElement('div', { className: 'game' }, [
  createElement('div', { className: 'game__heading' }, [
    createElement('h1', { className: 'game__title', textContent: 'Nonograms' }),
    createElement(
      'div',
      {
        className: 'game__button-container',
      },
      [
        createElement<HTMLButtonElement>('button', {
          className: 'button',
          id: 'back',
          textContent: 'Back',
        }),
        createElement<HTMLButtonElement>('button', {
          className: 'button',
          id: 'random',
          textContent: 'Random Game',
        }),
        createElement<HTMLButtonElement>('button', {
          className: 'button',
          id: 'continue',
          textContent: 'Continue Last Game',
        }),
      ]
    ),
    createElement('div', {
      id: 'results',
      textContent: 'No results yet. Play the game!',
    }),
  ]),
  createElement('div', { className: 'game__choose-level' }, [
    createElement('ul', { className: 'game__choose-list' }, [
      createElement('li', {
        className: 'game__choose-list-item',
        id: 'easy',
        textContent: 'easy',
      }),
      createElement('li', {
        className: 'game__choose-list-item',
        id: 'medium',
        textContent: 'medium',
      }),
      createElement('li', {
        className: 'game__choose-list-item',
        id: 'hard',
        textContent: 'hard',
      }),
    ]),
  ]),
]);

export const gameController = createElement(
  'div',
  { className: 'game__heading' },
  [
    createElement(
      'h1',
      { className: 'game__title', textContent: 'Nonograms' },
      [
        createElement(
          'div',
          {
            className: 'game__button-container',
          },
          [
            createElement('button', {
              className: 'button',
              id: 'back',
              textContent: 'Back',
            }),
            createElement('button', {
              className: 'button',
              id: 'reset',
              textContent: 'Reset Game',
            }),
            createElement('button', {
              className: 'button',
              id: 'show',
              textContent: 'Show Answer',
            }),
            createElement('button', {
              className: 'button',
              id: 'save',
              textContent: 'Save Game',
            }),
          ]
        ),
        createElement('div', { className: 'game__timer' }),
        createElement('div', {
          id: 'results',
          textContent: 'No results yet. Play the game!',
        }),
      ]
    ),
  ]
);

export const gameBoard = createElement('div', { id: 'gameBoard' });

export const game = createElement('div', { className: 'game' }, [
  gameController,
  gameBoard,
]);
