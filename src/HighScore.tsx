function HighScore({
  active,
  highScore,
  nPlays,
  currentScore,
}: {
  active: boolean;
  highScore: number;
  nPlays: number;
  currentScore: number;
}) {
  return (
    <div id="highScore">
      <h3>
        High Score: <b>{highScore}</b> Plays: <b>{nPlays}</b>
      </h3>

      {active && (
        <h3>
          Current Score: <b>{currentScore}</b>
        </h3>
      )}
    </div>
  );
}

export default HighScore;
