import {
  useSubmit,
  Link,
  json,
  redirect,
  useNavigate,
  useLocation,
} from "react-router-dom";
import classes from "../styles/Comment.module.css";

function CommentDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const submit = useSubmit();
  const comment = location.state.comment;

  function deleteHandler() {
    const proceed = window.confirm("삭제하시겠습니까?");
    if (proceed) {
      // {data, method }
      submit(null, { method: "delete" });
    }
  }

  console.log(comment);

  return (
    <>
      <div>
        <h3>Comment Detail</h3>
        {comment ? (
          <div>
            <div>
              <p className={classes.username}>
                Username : {comment.user.username}
              </p>
              <p className={classes.content}>Comment : {comment.content}</p>
              <p className={classes.time}>createdAt : {comment.createdAt}</p>
            </div>
            <button className={classes.delete} onClick={deleteHandler}>
              Delete
            </button>
            <Link
              to="edit"
              state={{ comment: comment }}
              className={classes.edit}
            >
              Edit
            </Link>

            <button
              onClick={() => {
                navigate(-1);
              }}
              className={classes.back}
            >
              Back
            </button>
          </div>
        ) : (
          <p style={{ textAlign: "center" }}>Loading...</p>
        )}
      </div>
    </>
  );
}

export default CommentDetail;

export async function action({ params, request }) {
  const commentId = params.commentId;
  const boardId = params.boardId;
  const response = await fetch(
    "http://localhost:8080/api/comment/" + commentId,
    {
      method: request.method,
    }
  );

  if (!response.ok) {
    throw json(
      { message: "Could not delete comment." },
      {
        status: 500,
      }
    );
  }
  return redirect(`/board/${boardId}`);
}
