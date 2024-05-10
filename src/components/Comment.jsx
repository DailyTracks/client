import { Link } from "react-router-dom";
import classes from "../styles/Comment.module.css";

function Comment({ comment }) {
  return (
    <>
      <div className={classes.comment}>
        <p className={classes.username}>User : {comment.user.username}</p>
        <p className={classes.content}>Comment : {comment.content}</p>

        <Link to={`${comment.id}`} state={{ comment: comment }}>
          자세히보기
        </Link>
      </div>
    </>
  );
}

export default Comment;
