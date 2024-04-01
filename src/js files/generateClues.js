function generateClues(solution) {  
  const rowClues = solution.map((row) =>
    row
      .reduce((acc, cell) => {
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

export { generateClues };
