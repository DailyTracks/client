import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import classes from "../styles/NavigationBar.module.css";
import { useNavigate } from "react-router-dom";

function NavigationBar() {
  const [recentBoards, setRecentBoards] = useState(null);
  const navBarRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/board?limit=10", { withCredentials: true })
      .then((response) => {
        setRecentBoards(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleWheel = (e) => {
    const container = navBarRef.current;
    container.scrollLeft += e.deltaY;
    container.scrollBottom += 0;
  };

  const detailBoardHandler = (board) => {
    navigate(`/board/${board.id}`);
  };

  function openNewBoardPage() {
    navigate("/board/new");
  }

  return (
    <div className={classes.navBar} onWheel={handleWheel} ref={navBarRef}>
      <button className={classes.new_btn} onClick={openNewBoardPage}>
        New
      </button>
      {recentBoards &&
        recentBoards.map((board, index) => (
          <img
            src={process.env.REACT_APP_PROXY + board.content.images[0]}
            alt={board.content.images[0]}
            key={index}
            className={classes.image}
            onClick={() => detailBoardHandler(board)}
          />
        ))}
    </div>
  );
}

export default NavigationBar;
