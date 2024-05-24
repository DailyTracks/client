import "../../styles/Boards.css";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import BoardNavigation from "../../components/board/BoardNavigation";
import { useState } from "react";

function BoardsRoot() {
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const [order, setOrder] = useState()

  const changeHandler = (event) => {
    const region = query.get("region");
    setOrder(event.target.value)
    navigate(`.?region=${region}&type=${event.target.value}`, {
      replace: true,
    });
  };

  return (
    <div className="boards">
      <BoardNavigation onChange={changeHandler} order={ order} />
      <Outlet />
    </div>
  );
}

export default BoardsRoot;
