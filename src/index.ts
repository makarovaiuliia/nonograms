import { EventEmitter } from './components/base/eventEmitter';
import './blocks/index.css';
import { game, gameSettingsMenu } from './components/elements';
import { Game } from './components/ui/game';
import { GameMenu } from './components/ui/gameMenu';
import { Level, Puzzles } from './types/types';
import puzzles from './data';
import { AppModel } from './components/model';

const events = new EventEmitter();

const gameMenu = new GameMenu(gameSettingsMenu, events);
const gameView = new Game(game, events);

const model = new AppModel(events);

events.on('level-chosen', ({ level }: { level: Level }) => {
  const games = puzzles[level];
  model.currentLevel = level;
  gameMenu.renderGames(games);
});

events.on('game-chosen', ({ index }: { index: number }) => {
  const selectedGame = puzzles[model.currentLevel!][index];
  model.currentGame = selectedGame;
  gameMenu.render().remove();
  gameView.createGameBoard(selectedGame, model.currentLevel!);
  document.body.append(gameView.render());
});

events.on('back:levels', () => {
  document.body.append(gameMenu.render());
  gameView.render().remove();
});
