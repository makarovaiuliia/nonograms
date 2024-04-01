import { BasePuzzle, Level } from '../types/types';
import { IEvents } from './base/eventEmitter';

export class AppModel {
  currentGame: BasePuzzle | null = null;
  currentLevel: Level | null = null;
  events: IEvents;

  constructor(events: IEvents) {
    this.events = events;
  }
}
