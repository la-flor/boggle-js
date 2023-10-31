import React, { useState } from "react";
import "./App.css";
import BoardTable from "./BoardTable";
import { createBoard, validateWord } from "./utilities/board";

function App() {
  const [board, setBoard] = useState<Board>(createBoard());
  const [highScore, setHighScore] = useState<number>(0);
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [nPlays, setNPlays] = useState<number>(0);
  const [word, setWord] = useState<string>("");
  const [words, setWords] = useState<Set<string>>(new Set());

  const resetBoard = () => setBoard(createBoard());

  const validateGuess = async (): Promise<boolean> => {
    const validWord: boolean = await validateWord(word);
    const wordAlreadyUsed: boolean = words.has(word);

    if (validWord && !wordAlreadyUsed) {
      return true;
    }

    return false;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (await validateGuess()) {
      setWords((words) => new Set([...words.values(), word]));
      setCurrentScore(word.length);
    }

    setWord("");
  };

  // TODO: create timer countdown

  // TODO: when timer runs out, update high score and reset current score
  // Math.max(word.length, highScore)

  return (
    <div id="boggle" className="App">
      <header className="App-header">
        <h1>Boggle</h1>
      </header>

      <BoardTable board={board} />

      <div>
        <h3>
          High Score: <b>{highScore}</b>
        </h3>

        <h3>
          Plays: <b>{nPlays}</b>
        </h3>
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="word">Word:</label>
        <input
          id="word"
          type="text"
          onChange={(e) => setWord(e.target.value)}
          value={word}
        />
        <button id="submit" type="submit">
          Submit
        </button>
      </form>

      <div>
        <ul className="words">
          {[...words.values()].map((word, i) => (
            <li key={i}>{word}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
