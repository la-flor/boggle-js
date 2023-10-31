export function createBoard(): string[][] {
  let board: Board = [];

  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (let i = 0; i < 5; i++) {
    let row = [];

    for (let i = 0; i < 5; i++) {
      let randomIndex = Math.floor(Math.random() * characters.length);
      row.push(characters[randomIndex]);
    }

    board.push(row);
  }

  return board;
}

export async function validateWord(word: string): Promise<boolean> {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
    );
    if (response.status !== 200) {
      throw new Error("Invalid word");
    }
    console.log(await response.json());

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
