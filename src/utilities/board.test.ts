import { createBoard } from "./board";

test("board creation is accurate length", () => {
  const board = createBoard();

  expect(board.length).toBe(5);
  expect(board[0].length).toBe(5);
  expect(board[1].length).toBe(5);
  expect(board[2].length).toBe(5);
  expect(board[3].length).toBe(5);
  expect(board[4].length).toBe(5);
});
