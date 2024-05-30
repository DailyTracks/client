import React from "react";
import { useLocation } from "react-router-dom";

const UserWriteDetail = () => {
  const location = useLocation();
  const board = location.state?.board;
  const contentData = JSON.parse(board.content);

  console.log(board.content);

  return (
    <div>
      <div>{board.id}</div>
      <img
        src={contentData.images[0]}
        alt={contentData.images[0]}
        // className={classes.image}
      />
    </div>
  );
};

export default UserWriteDetail;
