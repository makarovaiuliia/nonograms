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
