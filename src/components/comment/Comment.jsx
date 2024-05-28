import { Link } from "react-router-dom";
import classes from "../../styles/Comment.module.css";

function Comment({ comment }) {
  console.log(comment);
  const getRandomImageUrl = () => {
    const randomValue = Math.random().toString(36).substring(2, 15);
    return `https://source.boringavatars.com/beam?unique=${randomValue}`;
  };

  const dateFormatter = (date) => {
    const time = new Date(date);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    const Formatted = time.toLocaleString("ko-KR", options);
    return Formatted;
  };

  return (
    <>
      <div className={classes.comment}>
        <img
          // src="https://source.boringavatars.com/beam"
          src={getRandomImageUrl()}
          alt="profile"
          className={classes.profile_image}
        />
        <div style={{ width: "100%" }}>
          <p className={classes.username}>User : {comment.author}</p>
          <p className={classes.content}>Comment : {comment.content}</p>
          <p className={classes.createdAt}>
            {dateFormatter(comment.createdAt)}
          </p>
          <Link
            to={`${comment.id}`}
            state={{ comment: comment }}
            className={classes.detail}
          >
            자세히보기
          </Link>
        </div>
      </div>
    </>
  );
}

export default Comment;
