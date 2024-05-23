import {
  Link,
  useSubmit,
  useRouteLoaderData,
  json,
  redirect,
  defer,
  useNavigate,
} from "react-router-dom";
import classes from "../../styles/BoardDetail.module.css";
import { useState, useEffect } from "react";
import CommentsList from "../../components/comment/CommentsList";
import axios from "axios";

function BoardDetail() {
  const [loadedBoard, setLoadedBoard] = useState(null);
  const [comments, setComments] = useState(null);
  const [isWriter, setIsWriter] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [images, setImages] = useState(null);
  const submit = useSubmit();
  const { board } = useRouteLoaderData("board-detail");
  const myId = window.sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user")).id
    : null;
  // const myId = JSON.parse(sessionStorage.getItem("user")).id;
  const navigate = useNavigate();

  useEffect(() => {
    if (window.sessionStorage.getItem("isLogin") === "true") {
      setIsLogin(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    board
      .then((result) => {
        setImages(result.content.images);
        setLoadedBoard(result);
        setComments(result.comments);
        if (result.board.author_id === myId) {
          setIsWriter(true);
        }
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board]);

  const likeHandler = () => {
    if (!isLogin) {
      navigate("/auth?mode=login");
    }

    console.log(loadedBoard);

    axios
      .post(`/api/board/${loadedBoard.id}/like`)
      .then((response) => {
        console.log(response);
        navigate(".", { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function deleteHandler() {
    const proceed = window.confirm("삭제하시겠습니까?");
    if (proceed) {
      // {data, method }
      submit(null, { method: "delete" });
    }
  }

  return (
    <>
      <div className={classes.board}>
        {loadedBoard ? (
          <div>
            <div>
              <p className={classes.title}>{loadedBoard.title}</p>
              <p className={classes.region}>{loadedBoard.region}</p>
              {images &&
                images.map((image, index) => (
                  <img
                    key={index}
                    src={process.env.REACT_APP_PROXY + image}
                    alt={`Image ${index}`}
                    className={classes.image}
                  />
                ))}
              <p className={classes.content}>{loadedBoard.content.content}</p>
            </div>
            {isWriter && (
              <button className={classes.delete} onClick={deleteHandler}>
                Delete
              </button>
            )}
            {isWriter && (
              <Link to="edit" className={classes.edit}>
                Edit
              </Link>
            )}
            <button
              onClick={likeHandler}
            >{`좋아요 ${loadedBoard.like_count}`}</button>
            <button
              onClick={() => {
                navigate(-1);
              }}
              className={classes.back}
            >
              Back
            </button>
            <p className={classes.hit_count}>
              {`조회수 : ${loadedBoard.hit_count}`}
            </p>
          </div>
        ) : (
          <p style={{ textAlign: "center" }}>Loading...</p>
        )}
      </div>
      <div className={classes.new_box}>
        <Link to="new" className={classes.new}>
          Comment 추가하기
        </Link>
      </div>
      {comments && <CommentsList comments={comments} />}
    </>
  );
}

export default BoardDetail;

async function loadBoard(id) {
  const response = await fetch("/api/board/" + id);

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
  const response = await fetch("/api/board/" + boardId, {
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
