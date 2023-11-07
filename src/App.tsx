import React, { useState } from "react";
import "./App.css";
import BoardTable from "./BoardTable";
import HighScore from "./HighScore";
import Timer from "./Timer";
import { createBoard, validateWord } from "./utilities/board";

function App() {
  const [board, setBoard] = useState<Board>(createBoard());
  const [highScore, setHighScore] = useState<number>(0);
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [nPlays, setNPlays] = useState<number>(0);
  const [word, setWord] = useState<string>("");
  const [words, setWords] = useState<Set<string>>(new Set());
  const [message, setMessage] = useState<
    "" | "World already used" | "Invalid word"
  >("");

  const resetBoard = () => setBoard(createBoard());
  const [active, setActive] = useState<boolean>(false);

  function startGame() {
    resetBoard();
    setActive(true);
  }

  function endGame() {
    if (currentScore > highScore) {
      setHighScore(currentScore);
    }
    setNPlays(nPlays + 1);
    setCurrentScore(0);
    setWord("");
    setWords(new Set());
    setActive(!active);
    setMessage("");
  }

  const validateGuess = async (): Promise<boolean> => {
    const validWord: boolean = await validateWord(board, word.toUpperCase());

    const wordAlreadyUsed: boolean = words.has(word.toUpperCase());

    if (wordAlreadyUsed) {
      setMessage("World already used");
      return false;
    }

    if (!validWord) {
      setMessage("Invalid word");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");

    if (await validateGuess()) {
      setWords((words) => new Set([...words.values(), word.toUpperCase()]));
      setCurrentScore(currentScore + word.length);
    }

    setWord("");
  };

  return (
    <div id="boggle" className="App">
      <header className="App-header">
        <h1>Boggle</h1>
      </header>

      <BoardTable board={board} />

      <Timer active={active} startGame={startGame} endGame={endGame} />

      <HighScore
        active={active}
        highScore={highScore}
        nPlays={nPlays}
        currentScore={currentScore}
      />

      {active ? (
        <React.Fragment>
          {message && <p id="message">{message}</p>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="word">Word:</label>
            <input
              id="word"
              type="text"
              autoComplete="off"
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
        </React.Fragment>
      ) : null}
    </div>
  );
}

export default App;
