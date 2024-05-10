import { Outlet } from "react-router-dom";
import { useRouteLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import CommentNavigation from "../components/CommentNavigation";
import classes from "../styles/Board.module.css";

function CommentRoot() {
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

  return (
    <>
      <CommentNavigation />
      <div>
        <p>여행일지</p>
        {loadedBoard && (
          <div style={{ border: "1px solid red" }}>
            <p className={classes.title}>{loadedBoard.title}</p>
            <p className={classes.region}>{loadedBoard.region}</p>
            <p className={classes.content}>{loadedBoard.content}</p>
          </div>
        )}
      </div>
      <Outlet />
    </>
  );
}

export default CommentRoot;
