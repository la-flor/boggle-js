import { useEffect, useState } from "react";
import "./Timer.css";

function Timer({
  startGame,
  active,
  endGame,
}: {
  startGame: () => void;
  active: boolean;
  endGame: () => void;
}) {
  const [timeRemaining, setTimeRemaining] = useState<number>(60);

  useEffect(() => {
    if (!active) return;

    const interval = setInterval(() => {
      if (timeRemaining <= 0) {
        clearInterval(interval);
        endGame();
      }
      setTimeRemaining(timeRemaining - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [active, endGame, timeRemaining]);

  function reset() {
    setTimeRemaining(60);
    startGame();
  }

  return active ? (
    <div id="countdown">{timeRemaining} seconds</div>
  ) : (
    <button onClick={reset} id="startBtn">
      Reset Board
    </button>
  );
}

export default Timer;
