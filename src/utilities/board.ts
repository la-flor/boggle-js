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

export async function validateWord(
  board: Board,
  word: string,
): Promise<boolean> {
  const inDictionary = await validateDictionaryWord(word);
  const onBoard = findOnBoard(board, word);

  if (inDictionary && onBoard) return true;
  return false;
}

export async function validateDictionaryWord(word: string): Promise<boolean> {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
    );
    if (response.status !== 200) {
      throw new Error("Invalid word");
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

type Coordinates = [number, number];
type Seen = Set<Coordinates>;

function setContainsCoordinates(
  seen: Seen,
  [currentY, currentX]: Coordinates,
): boolean {
  for (let [seenY, seenX] of seen.values()) {
    if (seenY === currentY && seenX === currentX) {
      return true;
    }
  }

  return false;
}

/* Attempts to find a word on board starting at x,y */
function findFrom(
  board: Board,
  word: string,
  y: number,
  x: number,
  seen: Seen,
) {
  if (x > 4 || y > 4) return;

  if (board[y][x] !== word[0]) return false;

  if (setContainsCoordinates(seen, [y, x])) return false;

  if (word.length === 1) return true;

  const updatedSeen: Seen = new Set([...seen, [y, x]]);

  // adding diagonals
  if (y > 0) {
    if (findFrom(board, word.slice(1), y - 1, x, updatedSeen)) {
      return true;
    }
  }

  if (y < 4) {
    if (findFrom(board, word.slice(1), y + 1, x, updatedSeen)) {
      return true;
    }
  }

  if (x > 0) {
    if (findFrom(board, word.slice(1), y, x - 1, updatedSeen)) {
      return true;
    }
  }

  if (x < 4) {
    if (findFrom(board, word.slice(1), y, x + 1, updatedSeen)) {
      return true;
    }
  }

  // diagonals
  if (y > 0 && x > 0) {
    if (findFrom(board, word.slice(1), y - 1, x - 1, updatedSeen)) {
      return true;
    }
  }

  if (y < 4 && x < 4) {
    if (findFrom(board, word.slice(1), y + 1, x + 1, updatedSeen)) {
      return true;
    }
  }

  if (x > 0 && y < 4) {
    if (findFrom(board, word.slice(1), y + 1, x - 1, updatedSeen)) {
      return true;
    }
  }

  if (x < 4 && y > 0) {
    if (findFrom(board, word.slice(1), y - 1, x + 1, updatedSeen)) {
      return true;
    }
  }

  return false;
}

export function findOnBoard(board: Board, word: string) {
  for (let y = 0; y <= 4; y++) {
    for (let x = 0; x <= 4; x++) {
      if (findFrom(board, word, y, x, new Set())) return true;
    }
  }

  return false;
}
