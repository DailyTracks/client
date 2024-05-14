import "../../styles/Boards.css";
import { Outlet } from "react-router-dom";
import BoardNavigation from "../../components/BoardNavigation";

function BoardsRoot() {
  return (
    <div className="boards">
      <BoardNavigation />
      <Outlet />
    </div>
  );
}

export default BoardsRoot;
