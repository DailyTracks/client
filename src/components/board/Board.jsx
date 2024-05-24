import HashTag from "../HashTag";
import classes from "../../styles/Board.module.css";
import { Link, useLocation } from "react-router-dom";

function Board({ board }) {
  const location = useLocation();
  const currentRegion = location.search;
  const truncateContent = (content, length) => {
    return content.length > length
      ? content.substring(0, length) + "...더보기"
      : content;
  };
  return (
    <div className={classes.board}>
      <Link to={`/board/${board.id}${currentRegion}`} className={classes.title}>
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
      <p className={classes.content}>
        {truncateContent(board.content.content, 5)}
      </p>
      <HashTag />
    </div>
  );
}

export default Board;
