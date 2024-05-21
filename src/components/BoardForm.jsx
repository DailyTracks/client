import {
  Form,
  useNavigate,
  useNavigation,
  json,
  redirect,
} from "react-router-dom";
import classes from "../styles/BoardForm.module.css";

function BoardForm({ method, board }) {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  const cancelHandler = () => {
    navigate("..");
  };

  return (
    <Form method={method} className={classes.form}>
      <p>
        <label htmlFor="user_id">UserID</label>
        <input
          id="user_id"
          type="text"
          name="user_id"
          required
          defaultValue={board ? board.user_id : ""}
        />
      </p>
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={board ? board.title : ""}
        />
      </p>
      <p>
        <label htmlFor="region">Region</label>
        <input
          id="region"
          type="text"
          name="region"
          required
          defaultValue={board ? board.region : ""}
        />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows="5"
          required
          defaultValue={board ? board.content : ""}
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

export default BoardForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  console.log(data.get("id"));

  const boardData = {
    user_id: data.get("user_id"),
    title: data.get("title"),
    content: data.get("content"),
    region: data.get("region"),
  };

  // console.log("data : " + JSON.stringify(boardData));

  let url = "/api/board";

  if (method === "PUT") {
    const boardId = params.boardId;
    url = "/api/board/" + boardId;
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(boardData),
  });

  if (!response.ok) {
    throw json({ message: "Could not save board." }, { status: 500 });
  }

  return redirect("..");
}
