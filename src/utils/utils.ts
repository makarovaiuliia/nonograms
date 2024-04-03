export default function createElement<T extends HTMLElement>(
  tag: string,
  props?: Partial<Record<keyof T, string | boolean | object>>,
  children?: HTMLElement | HTMLElement[]
): T {
  const element = document.createElement(tag) as T;
  if (props) {
    for (const key in props) {
      const value = props[key];
      if (isPlainObject(value) && key === 'dataset') {
        setElementData(element, value);
      } else {
        // @ts-expect-error fix indexing later
        element[key] = isBoolean(value) ? value : String(value);
      }
    }
  }
  if (children) {
    for (const child of Array.isArray(children) ? children : [children]) {
      element.append(child);
    }
  }
  return element;
}

export function setElementData<T extends Record<string, unknown> | object>(
  el: HTMLElement,
  data: T
) {
  for (const key in data) {
    el.dataset[key] = String(data[key]);
  }
}

export function isPlainObject(obj: unknown): obj is object {
  const prototype = Object.getPrototypeOf(obj);
  return prototype === Object.getPrototypeOf({}) || prototype === null;
}

export function isBoolean(v: unknown): v is boolean {
  return typeof v === 'boolean';
}

export function generateClues(solution: number[][]) {
  const rowClues = solution.map((row) =>
    row
      .reduce((acc: number[], cell) => {
        if (cell === 1) {
          if (acc.length === 0 || acc[acc.length - 1] === 0) {
            acc.push(1);
          } else {
            acc[acc.length - 1]++;
          }
        } else {
          acc.push(0);
        }
        return acc;
      }, [])
      .filter((num) => num > 0)
  );

  const columnClues = [];
  for (let col = 0; col < solution[0].length; col++) {
    let clue = 0;
    const colClue = [];
    for (let row = 0; row < solution.length; row++) {
      if (solution[row][col] === 1) {
        clue++;
      } else if (clue > 0) {
        colClue.push(clue);
        clue = 0;
      }
    }
    if (clue > 0) {
      colClue.push(clue);
    }
    columnClues.push(colClue);
  }

  return { rowClues, columnClues };
}
export let maxRowHints: number;
export let maxColHints: number;

export function generateGrid(
  solution: number[][],
  hints: { rowClues: number[][]; columnClues: number[][] }
): HTMLElement {
  const grid = createElement('table', { className: 'game__table' });

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
      const clueCell = createElement('td', { className: 'game__clue-cell' });
      if ((index + 1) % 5 === 0) {
        clueCell.classList.add('game__clue-cell-thick-border');
      }
      clueCell.textContent = clue.length > i ? clue[i].toString() : '';
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
      const clueCell = createElement('td', { className: 'game__clue-cell' });
      clueCell.textContent =
        hints.rowClues[rowIndex].length > i
          ? hints.rowClues[rowIndex][i].toString()
          : '';
      tr.appendChild(clueCell);
    }

    row.forEach((_, index) => {
      const td = createElement('td', { className: 'game__cell' });
      if ((index + 1) % 5 === 0) {
        td.classList.add('game__cell-thick-border');
      }
      tr.appendChild(td);
    });
    grid.appendChild(tr);
  });

  return grid;
}
