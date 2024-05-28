import classes from "../../styles/BoardList.module.css";
import Board from "./Board";
import { useSearchParams } from "react-router-dom";

function BoardsList({ boards }) {
  const [searchParams] = useSearchParams();
  const regionName = searchParams.get("region");

  return (
    <ul className={classes.list}>
      {boards
        .filter((board) => board.region === regionName)
        .map((board) => {
          return (
            <li
              key={board.id}
              style={{ justifyContent: "center", display: "flex" }}
            >
              <Board board={board} />
            </li>
          );
        })}
    </ul>
  );
}

export default BoardsList;
