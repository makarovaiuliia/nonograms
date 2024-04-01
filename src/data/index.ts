import { Puzzles } from '../types/types';

const puzzles: Puzzles = {
  easy: [
    {
      name: 'dog',
      solution: [
        [0, 0, 0, 1, 1],
        [0, 0, 0, 1, 0],
        [1, 1, 1, 0, 0],
        [1, 1, 1, 0, 0],
        [1, 0, 1, 1, 1],
      ],
    },
    {
      name: 'heart',
      solution: [
        [0, 1, 0, 1, 0],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [0, 1, 1, 1, 0],
        [0, 0, 1, 0, 0],
      ],
    },
    {
      name: 'cockerel',
      solution: [
        [0, 1, 0, 0, 0],
        [1, 1, 0, 1, 1],
        [0, 1, 1, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 1, 0, 0],
      ],
    },
    {
      name: 'duck',
      solution: [
        [0, 1, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [1, 1, 1, 0, 1],
        [0, 0, 1, 1, 1],
        [0, 0, 1, 1, 1],
      ],
    },
    {
      name: 'boat',
      solution: [
        [1, 0, 0, 0, 1],
        [1, 1, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [1, 1, 1, 1, 0],
        [1, 1, 1, 1, 0],
      ],
    },
  ],
  medium: [
    {
      name: 'spot',
      solution: [
        [1, 0, 0, 0, 0, 0, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1, 1, 1, 0],
        [1, 0, 0, 0, 1, 0, 0, 1, 1, 1],
        [1, 1, 1, 1, 1, 0, 0, 0, 1, 1],
        [1, 1, 1, 1, 1, 0, 1, 0, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
        [1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
      ],
    },
    {
      name: 'cat',
      solution: [
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
        [1, 0, 0, 0, 1, 0, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
        [0, 1, 1, 1, 0, 0, 1, 1, 1, 1],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 1, 1, 1, 1, 0, 1, 1],
      ],
    },
    {
      name: 'kettle',
      solution: [
        [0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 0, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      ],
    },
    {
      name: 'cup',
      solution: [
        [0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
        [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 0, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ],
    },
    {
      name: 'apple',
      solution: [
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 0, 0, 1, 0, 0],
        [1, 1, 1, 1, 1, 0, 1, 1, 0, 0],
        [1, 1, 1, 1, 0, 0, 1, 0, 0, 0],
        [1, 1, 0, 0, 1, 1, 1, 1, 1, 0],
        [1, 0, 0, 1, 1, 1, 1, 0, 1, 1],
        [0, 0, 0, 1, 1, 1, 1, 1, 0, 1],
        [0, 0, 0, 1, 1, 1, 1, 1, 0, 1],
        [0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 0],
      ],
    },
  ],
  hard: [
    {
      name: 'mickey mouse',
      solution: [
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
        [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
        [0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0],
        [1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0],
        [1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0],
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      ],
    },
    {
      name: 'bow',
      solution: [
        [0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1],
        [0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0],
        [1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1],
        [1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1],
        [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
        [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ],
    },
    {
      name: 'owl',
      solution: [
        [0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
        [0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0],
        [0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0],
        [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
        [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0],
        [0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1],
      ],
    },
    {
      name: 'bird',
      solution: [
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0],
        [1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0],
        [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1],
        [1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      ],
    },
    {
      name: 'fisherman',
      solution: [
        [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
        [0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0],
        [0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0],
        [0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0],
        [0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0],
        [0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1],
        [0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
        [0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
        [0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ],
    },
  ],
};

export default puzzles;
