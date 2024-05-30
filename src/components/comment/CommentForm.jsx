import {
  Form,
  useNavigate,
  useNavigation,
  useLocation,
  redirect,
} from "react-router-dom";
import classes from "../../styles/BoardForm.module.css";

function CommentForm({ method }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const location = useLocation();

  let comment = null;
  if (method === "put") {
    comment = location.state.comment;
  }

  const isSubmitting = navigation.state === "submitting";

  const cancelHandler = () => {
    navigate(-1);
  };

  return (
    <Form method={method} className={classes.form}>
      {method === "post" ? (
        <h3>Comment 추가하기</h3>
      ) : (
        <h3>Comment 수정하기</h3>
      )}
      <p>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows="5"
          required
          defaultValue={comment ? comment.content : ""}
        />
      </p>

      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default CommentForm;

export async function action({ request, params }) {
  const method = request.method;
  const boardId = params.boardId;
  const data = await request.formData();

  const commentData = {
    board_id: boardId,
    content: data.get("content"),
  };

  let url = "/api/comment";

  if (method === "PUT") {
    const commentId = params.commentId;
    url = "/api/comment/" + commentId;
  }
  console.log(url);

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentData),
    credentials: "include",
  });

  console.log(response);

  if (method === "PUT") {
    return redirect("../..");
  }

  return redirect("..");
}
