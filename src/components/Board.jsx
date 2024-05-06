import HashTag from "./HashTag";
import classes from "../styles/Board.module.css";
import { Link } from "react-router-dom";

function Board({ board }) {
  return (
    <div className={classes.board}>
      {/* <img className={classes.image} src="" alt="memo_img" /> */}
      <Link to={`/board/${board.id}`} className={classes.title}>
        {board.title}
      </Link>
      <p className={classes.content}>{board.content}</p>
      <HashTag />
    </div>
  );
}

export default Board;
