import "./BoardTable.css";

const BoardTable = ({ board }: { board: Board }) => {
  return (
    <table className="board fadein">
      <tbody>
        {board.map((row, i) => (
          <tr key={i}>
            {row.map((letter, j) => (
              <td key={j}>{letter}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BoardTable;
