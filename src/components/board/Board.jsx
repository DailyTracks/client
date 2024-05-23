import HashTag from "../HashTag";
import classes from "../../styles/Board.module.css";
import { Link } from "react-router-dom";

function Board({ board }) {
  return (
    <div className={classes.board}>
      {/* <img className={classes.image} src="" alt="memo_img" /> */}
      <Link to={`/board/${board.id}`} className={classes.title}>
        {board.title}
      </Link>
      {board.content.images.map((image, index) => (
        <img
          key={index}
          src={process.env.REACT_APP_PROXY + image}
          className={classes.image}
          alt={`Image ${index}`}
        />
      ))}
      <p className={classes.content}>{board.content.content}</p>
      {/* {board.content.images} */}
      <HashTag />
    </div>
  );
}

export default Board;
