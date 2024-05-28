import {
  Link,
  useSubmit,
  useRouteLoaderData,
  json,
  redirect,
  defer,
  useNavigate,
  useLocation,
} from "react-router-dom";
import classes from "../../styles/BoardDetail.module.css";
import { useState, useEffect } from "react";
import CommentsList from "../../components/comment/CommentsList";
import axios from "axios";
import SwiperImage from "../../components/SwiperImage";

function BoardDetail() {
  const [loadedBoard, setLoadedBoard] = useState(null);
  const [comments, setComments] = useState(null);
  const [isWriter, setIsWriter] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [images, setImages] = useState(null);
  const submit = useSubmit();
  const location = useLocation();
  console.log(location);
  const currentSearch = location.search;
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
        console.log(result);
        setImages(result.content.images);
        setLoadedBoard(result);
        setComments(result.comments);
        if (result.author_id === myId) {
          setIsWriter(true);
        }
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
  }, [board, location.key]);

  const likeHandler = () => {
    if (!isLogin) {
      // navigate("/auth?mode=login");
      navigate(`/auth?mode=login&redirectURL=${location.pathname}`);
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
      navigate(`/board${currentSearch}`, { replace: true });
    }
  }

  return (
    <>
      <div className={classes.board}>
        {loadedBoard ? (
          <div>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0 1rem",
                  paddingBottom: "5px",
                  borderBottom: "2px solid black",
                }}
              >
                <div>
                  <p className={classes.title}>제목: {loadedBoard.title}</p>
                  <p className={classes.author}>작성자: {loadedBoard.author}</p>
                </div>
                <img
                  src="https://source.boringavatars.com/beam"
                  alt="profile"
                  className={classes.profile_image}
                />
              </div>
              {/* <p className={classes.region}>지역: {loadedBoard.region}</p> */}
              {/* {images &&
                images.map((image, index) => (
                  <img
                    key={index}
                    src={process.env.REACT_APP_PROXY + image}
                    alt={`${index}`}
                    className={classes.image}
                  />
                ))} */}
              {images && <SwiperImage data={images} />}
              <p className={classes.content}>{loadedBoard.content.content}</p>
            </div>
            <button
              onClick={() => {
                navigate(`/board${currentSearch}`, { replace: true });
              }}
              className={classes.back}
            >
              <i class="fa-solid fa-arrow-left"></i>
            </button>
            <button
              onClick={likeHandler}
              className={classes.like}
            >{`좋아요 ${loadedBoard.like_count}`}</button>
            {isWriter && (
              <button className={classes.delete} onClick={deleteHandler}>
                Delete
              </button>
            )}
            {isWriter && (
              <button
                onClick={() => {
                  navigate(`edit${currentSearch}`);
                }}
                className={classes.edit}
              >
                Edit
              </button>
            )}

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
