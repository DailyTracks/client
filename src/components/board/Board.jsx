import HashTag from "../HashTag";
import classes from "../../styles/Board.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Board({ board }) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentRegion = location.search;
  const truncateContent = (content, length) => {
    return content.length > length
      ? content.substring(0, length) + "...  더보기"
      : content;
  };

  const detailHandler = () => {
    navigate(`/board/${board.id}${currentRegion}`);
  };

  return (
    <div className={classes.board} onClick={detailHandler}>
      <Link to={`/board/${board.id}${currentRegion}`} className={classes.title}>
        {board.title}
      </Link>
      <div className={classes.image_container}>
        <img
          src={process.env.REACT_APP_PROXY + board.content.images[0]}
          className={classes.image}
          alt={`${board.id}`}
        />
      </div>
      <p className={classes.content}>
        {truncateContent(board.content.content, 5)}
      </p>
      <HashTag />
    </div>
  );
}

export default Board;
