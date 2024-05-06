import {
  Link,
  useSubmit,
  useRouteLoaderData,
  json,
  redirect,
  defer,
} from "react-router-dom";
import classes from "../styles/BoardDetail.module.css";
import { useState, useEffect } from "react";

function BoardDetail() {
  const [loadedBoard, setLoadedBoard] = useState(null);
  const { board } = useRouteLoaderData("board-detail");

  useEffect(() => {
    board
      .then((result) => {
        setLoadedBoard(result);
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
  }, [board]);

  const submit = useSubmit();

  function deleteHandler() {
    const proceed = window.confirm("삭제하시겠습니까?");
    if (proceed) {
      // {data, method }
      submit(null, { method: "delete" });
    }
  }

  return (
    <div>
      {loadedBoard ? (
        <div>
          <p>DetailPage</p>
          <div>
            <p className={classes.title}>{loadedBoard.title}</p>
            <p className={classes.region}>{loadedBoard.region}</p>
            <p className={classes.content}>{loadedBoard.content}</p>
          </div>
          <button className={classes.delete} onClick={deleteHandler}>
            Delete
          </button>
          <Link to="edit" className={classes.edit}>
            Edit
          </Link>

          <Link to="/board" className={classes.back}>
            Back
          </Link>
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>Loading...</p>
      )}
    </div>
  );
}

export default BoardDetail;

async function loadBoard(id) {
  const response = await fetch("http://localhost:8080/api/board/" + id);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected board." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData;
  }
}

export function loader({ request, params }) {
  const id = params.boardId;

  return defer({
    board: loadBoard(id),
  });
}

export async function action({ params, request }) {
  const boardId = params.boardId;
  const response = await fetch("http://localhost:8080/api/board/" + boardId, {
    method: request.method,
  });

  if (!response.ok) {
    throw json(
      { message: "Could not delete board." },
      {
        status: 500,
      }
    );
  }
  return redirect("/board");
}
