import { easy, medium, hard } from './nonograms.js';
import { generateClues } from './generateClues.js';
import { createThemeChanger } from './themeChanger.js';
import { createSoundChanger, sound } from './soundChanger.js';

// body elements
const body = document.querySelector('body');
// body.classList.add("page");
const backToLevelsButton = createElement('button', 'button', 'Back');
const backToGamesButton = createElement('button', 'button', 'Back');
const backToLevelsFromRandomButton = createElement('button', 'button', 'Back');

// main section elements
const main = createElement('main', 'game');
const gameHeading = createElement('section', 'game__heading');
const gameBestResults = createElement('div');
const gameInstruction = createElement(
  'p',
  'game__instructions',
  'In order to start a game click somewhere on a game table.'
);
const gameTitle = createElement('h1', 'game__title', 'Nonograms');
const gameTimer = createElement('p', 'game__timer', '00:00');
const gameButtonContainer = createElement('div', 'game__button-container');
const showAnswerButton = createElement('button', 'button', 'Show Answer');
const restartButton = createElement('button', 'button', 'Reset Game');
const randomButton = createElement('button', 'button', 'Random Game');
const continueGameButton = createElement(
  'button',
  'button',
  'Continue Last Game'
);
const saveGameButton = createElement('button', 'button', 'Save Game');
gameButtonContainer.append(randomButton, continueGameButton);

// level choose elements
const levelChoose = createElement('section', 'game__choose-level');
const levelChooseList = createElement('ul', 'game__choose-list');

// game choose elements
const gameChoose = createElement('section', 'game__choose');

// popup elements
const popup = createElement('div', 'popup');
const popupContent = createElement('div', 'popup__content');
const popupMessage = document.createElement('p');
const popupButton = createElement(
  'button',
  'button_popup',
  'Solve another puzzle'
);

// grid game container
const gameContainer = document.createElement('section');

// event listeners
showAnswerButton.addEventListener('click', handleShowAnswer);
restartButton.addEventListener('click', handleRestartGame);
popupButton.addEventListener('click', handlePopupClick);
document.addEventListener('keydown', handlePopupClick);
randomButton.addEventListener('click', handleRandomButton);
continueGameButton.addEventListener('click', handleContinueGame);
saveGameButton.addEventListener('click', saveCurrentGameState);
backToLevelsButton.addEventListener('click', handleBackToLevel);
backToGamesButton.addEventListener('click', handleBackToGames);
backToLevelsFromRandomButton.addEventListener(
  'click',
  handleBackToLevelFromRandom
);

// sounds
const winGameSound = new Audio('./assets/audio/win-sound.mp3');
const clickCellSound = new Audio('./assets/audio/click-sound.mp3');

// game state
let currentGameState;
let maxRowHints;
let maxColHints;
let currentGameSolution;
let timerIsActive = false;
let currentGameObj;

createStartingLayout();
createThemeChanger();
createSoundChanger();

// layout functions

function createElement(tag, classNames, textContent) {
  const element = document.createElement(tag);
  if (classNames) element.classList.add(...classNames.split(' '));
  if (textContent) element.textContent = textContent;
  return element;
}

function createStartingLayout() {
  body.append(createGameContainer(), createPopup());
  levelChooseList.addEventListener('click', handleChooseLevel);
}

function createGameContainer() {
  gameHeading.append(gameTitle);
  const lastGameState = JSON.parse(localStorage.getItem('currentGame'));
  if (!lastGameState) {
    continueGameButton.remove();
  }
  gameHeading.append(gameButtonContainer);
  const bestResults = renderBestResults();

  if (bestResults) {
    gameBestResults.append(bestResults);
    gameHeading.append(gameBestResults);
  }

  //list items
  const gameLevels = ['easy', 'medium', 'hard'];

  gameLevels.forEach((difficulty) => {
    const listItem = createElement('li', 'game__choose-list-item', difficulty);
    listItem.setAttribute('id', difficulty);
    levelChooseList.append(listItem);
  });

  levelChoose.append(levelChooseList);

  main.append(gameHeading, levelChoose);
  return main;
}

function renderBestResults() {
  const results = JSON.parse(localStorage.getItem('bestTimes'));

  if (results && results.length > 0) {
    const bestResultsList = createElement('ul', 'game__best-results-list');
    results.forEach((result, index) => {
      // Extracting level, name, and time from the result object
      const { level, name, time } = result;
      const timeArr = time.split(':');
      const minutes = parseInt(timeArr[0]);
      const seconds = parseInt(timeArr[1]);
      const timeText =
        minutes > 0
          ? `${minutes} minutes ${seconds} seconds`
          : `${seconds} seconds`;

      const resultElement = createElement('li');
      resultElement.textContent = `${
        index + 1
      } place: ${name} (${level}) - ${timeText}`;
      bestResultsList.append(resultElement);
    });
    return bestResultsList;
  }
  return null;
}

function handleContinueGame() {
  levelChoose.style.display = 'none';
  gameChoose.style.display = 'none';

  randomButton.remove();
  continueGameButton.remove();
  gameHeading.append(gameInstruction);
  gameButtonContainer.append(showAnswerButton, restartButton, saveGameButton);

  const savedGame = JSON.parse(localStorage.getItem('currentGame'));

  console.log(savedGame);

  if (savedGame) {
    // Исправить
    currentGameObj = savedGame.gameObject;
    currentGameSolution = savedGame.solution;
    currentGameState = savedGame.state;
    gameTimer.textContent = savedGame.time;

    const grid = generateGrid(
      savedGame.solution,
      generateClues(savedGame.solution)
    );
    main.append(grid);

    fillAllClickedCells();

    grid.addEventListener(
      'click',
      () => {
        startGame(grid);
      },
      { once: true }
    );

    grid.addEventListener('click', handleClueClick);
  } else {
    console.log('No saved game found');
  }
}

function fillAllClickedCells() {
  const currentGameGrid = gameContainer.querySelectorAll('.game__cell');

  currentGameState.flat().forEach((cell, index) => {
    if (cell === 'filled') {
      currentGameGrid[index].classList.add('game__cell-active');
    }
  });
}

function handleChooseLevel(event) {
  if (event.target.classList.contains('game__choose-list-item')) {
    randomButton.remove();
    gameButtonContainer.prepend(backToLevelsButton);
    const level = event.target.id;
    levelChoose.style.display = 'none';
    switch (level) {
      case 'easy':
        gameChoose.append(createGameList(easy));
        break;
      case 'medium':
        gameChoose.append(createGameList(medium));
        break;
      case 'hard':
        gameChoose.append(createGameList(hard));
        break;
      default:
        break;
    }
  }
  gameChoose.style.display = 'block';
  main.append(gameChoose);
}

function handleBackToLevel() {
  gameButtonContainer.prepend(randomButton);
  levelChoose.style.display = 'block';
  gameChoose.innerHTML = '';
  gameChoose.remove();
  backToLevelsButton.remove();
}

function handleBackToLevelFromRandom() {
  backToLevelsFromRandomButton.remove();
  gameContainer.remove();
  gameTimer.remove();
  gameInstruction.remove();
  gameContainer.innerHTML = '';

  if (timerIsActive) {
    changeStateOfTimer();
    resetTimer();
  }

  backToGamesButton.remove();
  restartButton.remove();
  saveGameButton.remove();
  showAnswerButton.remove();
  gameButtonContainer.append(randomButton, continueGameButton);

  const lastGameState = JSON.parse(localStorage.getItem('currentGame'));
  if (!lastGameState) {
    continueGameButton.remove();
  }

  levelChoose.style.display = 'block';
}

function createGameList(gameTemplates) {
  const listOfKeys = Object.keys(gameTemplates);
  const list = createElement('ul', 'game__choose-list');
  listOfKeys.forEach((key) => {
    const listItem = createElement(
      'li',
      'game__choose-list-item',
      gameTemplates[key].name
    );
    listItem.id = key;
    list.append(listItem);
  });
  list.addEventListener('click', (event) => {
    if (event.target.classList.contains('game__choose-list-item')) {
      const item = event.target;
      selectGame(item.id, gameTemplates);
    }
  });
  return list;
}

// timer functions

function startTimer() {
  if (timerIsActive) {
    const timer = gameTimer.textContent;
    const arr = timer.split(':');
    let minutes = arr[0];
    let seconds = arr[1];

    if (seconds == 59) {
      minutes++;
      seconds = 0;
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
    } else {
      seconds++;
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    gameTimer.textContent = `${minutes}:${seconds}`;
    setTimeout(startTimer, 1000);
  }
}

function changeStateOfTimer() {
  if (!timerIsActive) {
    timerIsActive = true;
    startTimer();
    console.log('timer is working');
  } else {
    timerIsActive = false;
    console.log('timer is paused');
  }
}

function resetTimer() {
  gameTimer.textContent = '00:00';
}

// selection

function handleRandomButton() {
  levelChoose.style.display = 'none';

  const levels = [easy, medium, hard];
  const randomLevel = levels[Math.floor(Math.random() * levels.length)];
  const levelKeys = Object.keys(randomLevel);
  const randomGameKey =
    levelKeys[[Math.floor(Math.random() * levelKeys.length)]];

  selectGame(randomGameKey, randomLevel, true);
}

function selectGame(id, gameTemplates, random) {
  gameChoose.style.display = 'none';
  const gameSolution = gameTemplates[id].solution;
  console.log(gameSolution);
  currentGameSolution = gameSolution;
  currentGameObj = gameTemplates[id];

  const gameHints = generateClues(gameSolution);
  const grid = generateGrid(gameSolution, gameHints);

  randomButton.remove();
  continueGameButton.remove();
  backToLevelsButton.remove();
  gameButtonContainer.append(restartButton, showAnswerButton);

  if (!random) {
    gameButtonContainer.prepend(backToGamesButton);
  } else {
    gameButtonContainer.prepend(backToLevelsFromRandomButton);
  }

  gameTitle.remove();
  gameBestResults.remove();
  gameButtonContainer.remove();

  gameHeading.append(
    gameTitle,
    gameButtonContainer,
    gameTimer,
    gameInstruction,
    gameBestResults
  );

  main.append(grid);
  grid.addEventListener(
    'click',
    () => {
      startGame(grid);
    },
    { once: true }
  );

  grid.addEventListener('click', handleClueClick);

  currentGameState = gameSolution.map((row) =>
    row.map((cell) => (cell === 1 ? 'unfilled' : 'empty'))
  );
}

function handleBackToGames() {
  if (timerIsActive) {
    changeStateOfTimer();
    resetTimer();
  }
  gameContainer.remove();
  gameTimer.remove();
  gameInstruction.remove();
  gameContainer.innerHTML = '';
  backToGamesButton.remove();
  restartButton.remove();
  showAnswerButton.remove();
  saveGameButton.remove();
  gameButtonContainer.append(
    backToLevelsButton,
    randomButton,
    continueGameButton
  );
  const lastGameState = JSON.parse(localStorage.getItem('currentGame'));
  if (!lastGameState) {
    continueGameButton.remove();
  }
  gameChoose.style.display = 'block';
}

function generateGrid(solution, hints) {
  const grid = document.createElement('table');
  grid.className = 'game__table';

  const maxColumnClues = Math.max(
    ...hints.columnClues.map((clue) => clue.length)
  );
  maxColHints = maxColumnClues;
  const maxRowClues = Math.max(...hints.rowClues.map((clue) => clue.length));
  maxRowHints = maxRowClues;

  for (let i = 0; i < maxColumnClues; i++) {
    const clueRow = document.createElement('tr');

    if (i < 1) {
      const alignCell = document.createElement('td');
      alignCell.rowSpan = maxColumnClues - i;
      alignCell.colSpan = maxRowClues;
      clueRow.appendChild(alignCell);
    }

    hints.columnClues.forEach((clue, index) => {
      const clueCell = createElement('td', 'game__clue-cell');
      if ((index + 1) % 5 === 0) {
        clueCell.classList.add('game__clue-cell-thick-border');
      }
      clueCell.textContent = clue.length > i ? clue[i] : '';
      clueRow.appendChild(clueCell);
    });
    grid.appendChild(clueRow);
  }

  solution.forEach((row, rowIndex) => {
    const tr = document.createElement('tr');

    if ((rowIndex + 1) % 5 === 0) {
      tr.classList.add('game__row-thick-border');
    }

    for (let i = 0; i < maxRowClues; i++) {
      const clueCell = createElement('td', 'game__clue-cell');
      clueCell.textContent =
        hints.rowClues[rowIndex].length > i ? hints.rowClues[rowIndex][i] : '';
      tr.appendChild(clueCell);
    }

    row.forEach((_, index) => {
      const td = createElement('td', 'game__cell');
      if ((index + 1) % 5 === 0) {
        td.classList.add('game__cell-thick-border');
      }
      tr.appendChild(td);
    });
    grid.appendChild(tr);
  });

  gameContainer.appendChild(grid);
  return gameContainer;
}

// game functionality

function startGame(grid) {
  gameInstruction.remove();
  gameButtonContainer.append(saveGameButton);
  changeStateOfTimer();
  grid.addEventListener('click', handleLeftClick);
  grid.addEventListener('contextmenu', handleRightClick);
}

function handleLeftClick(event) {
  if (event.target.classList.contains('game__cell')) {
    if (sound) clickCellSound.play();
    const cell = event.target;
    if (cell.classList.contains('game__cell-crossed')) {
      cell.classList.remove('game__cell-crossed');
    }
    cell.classList.toggle('game__cell-active');

    const rowIndex = cell.parentNode.rowIndex - maxColHints;
    const colIndex = cell.cellIndex - maxRowHints;

    currentGameState[rowIndex][colIndex] = cell.classList.contains(
      'game__cell-active'
    )
      ? 'filled'
      : 'unfilled';

    if (checkWin()) {
      if (sound) winGameSound.play();
      changeStateOfTimer();
      showPopup(gameTimer.textContent.split(':'));
      deleteSavedGameState();
    }
  }
}

function deleteSavedGameState() {
  localStorage.removeItem('currentGame');
}

function saveCurrentGameState() {
  saveGameButton.textContent = 'Saving...';
  const gameState = {
    gameObject: currentGameObj,
    solution: currentGameSolution,
    state: currentGameState,
    time: gameTimer.textContent,
  };
  localStorage.setItem('currentGame', JSON.stringify(gameState));
  setTimeout(() => {
    saveGameButton.textContent = 'Save Game';
  }, 1000);
}

function handleRightClick(event) {
  event.preventDefault();
  const cell = event.target;

  if (cell.classList.contains('game__cell')) {
    if (sound) clickCellSound.play();
    const rowIndex = cell.parentNode.rowIndex - maxColHints;
    const colIndex = cell.cellIndex - maxRowHints;
    cell.classList.toggle('game__cell-crossed');

    if (cell.classList.contains('game__cell-active')) {
      cell.classList.remove('game__cell-active');
      currentGameSolution[rowIndex][colIndex] === 1
        ? (currentGameState[rowIndex][colIndex] = 'unfilled')
        : (currentGameState[rowIndex][colIndex] = 'empty');
    }
  }
}

function handleClueClick(event) {
  if (
    event.target.classList.contains('game__clue-cell') &&
    event.target.textContent !== ''
  ) {
    if (sound) clickCellSound.play();
    event.target.classList.toggle('game__clue-cell-crossed');
  }
}

function checkWin() {
  for (let rowIndex = 0; rowIndex < currentGameState.length; rowIndex++) {
    for (
      let colIndex = 0;
      colIndex < currentGameState[rowIndex].length;
      colIndex++
    ) {
      const gameState = currentGameState[rowIndex][colIndex];
      const solutionState = currentGameSolution[rowIndex][colIndex];

      if (solutionState === 1 && gameState !== 'filled') {
        return false;
      }

      if (solutionState === 0 && gameState === 'filled') {
        return false;
      }
    }
  }
  return true;
}

function handleShowAnswer() {
  const currentGameGrid = gameContainer.querySelectorAll('.game__cell');
  currentGameSolution.flat().forEach((cell, index) => {
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
  changeStateOfTimer();
  setTimeout(showPopup, 2000);
}

function handleRestartGame() {
  const currentGameGrid = gameContainer.querySelectorAll('.game__cell');

  currentGameGrid.forEach((cell) => {
    cell.classList.remove('game__cell-active', 'game__cell-crossed');
  });

  for (let i = 0; i < currentGameState.length; i++) {
    for (let j = 0; j < currentGameState[i].length; j++) {
      if (currentGameState[i][j] === 'filled') {
        currentGameState[i][j] =
          currentGameSolution[i][j] === 1 ? 'unfilled' : 'empty';
      }
    }
  }
}

// popup

function createPopup() {
  popupContent.append(popupMessage, popupButton);
  popup.append(popupContent);

  return popup;
}

function showPopup(time) {
  if (time) {
    const minutes = parseInt(time[0]);
    const seconds = parseInt(time[1]);
    const timeText =
      minutes > 0
        ? `${minutes} minutes ${seconds} seconds`
        : `${seconds} seconds`;
    popupMessage.textContent = `Congratulations! You solved the puzzle in ${timeText}`;
    saveResult(
      currentGameObj.level,
      currentGameObj.name,
      gameTimer.textContent
    );
  } else {
    popupMessage.textContent = `Not this time. But you can play another game!`;
  }
  popup.classList.add('popup-is-opened');
}

function handlePopupClick(event) {
  if (
    (event.type === 'keydown' &&
      event.key === 'Enter' &&
      popup.classList.contains('popup-is-opened')) ||
    event.type === 'click'
  ) {
    restartGame();
    popup.classList.remove('popup-is-opened');
  }
}

function restartGame() {
  resetTimer();

  gameChoose.remove();
  gameChoose.style.display = 'block';
  gameChoose.innerHTML = '';

  showAnswerButton.remove();
  restartButton.remove();
  saveGameButton.remove();
  backToGamesButton.remove();
  backToLevelsFromRandomButton.remove();

  gameButtonContainer.append(randomButton, continueGameButton);
  const lastGameState = JSON.parse(localStorage.getItem('currentGame'));
  if (!lastGameState) {
    continueGameButton.remove();
  }

  gameContainer.remove();
  gameTimer.remove();
  gameInstruction.remove();
  gameContainer.innerHTML = '';

  currentGameState = null;
  maxRowHints = null;
  maxColHints = null;
  currentGameSolution = null;
  currentGameObj = null;

  levelChoose.style.display = 'block';

  const ranking = gameHeading.querySelector('.game__best-results-list');
  if (ranking) {
    ranking.remove();
  }

  const bestResults = renderBestResults();

  if (bestResults) {
    gameBestResults.append(bestResults);
    gameHeading.append(gameBestResults);
  }
}

function saveResult(level, gameName, time) {
  const results = JSON.parse(localStorage.getItem('bestTimes')) || [];

  function timeToSeconds(timeStr) {
    const [minutes, seconds] = timeStr.split(':').map(Number);
    return minutes * 60 + seconds;
  }

  const newResult = {
    level: level,
    name: gameName,
    time: time,
    timeInSeconds: timeToSeconds(time),
  };

  results.push(newResult);

  results.sort((a, b) => a.timeInSeconds - b.timeInSeconds);

  const topFiveResults = results.slice(0, 5);

  localStorage.setItem('bestTimes', JSON.stringify(topFiveResults));
}
