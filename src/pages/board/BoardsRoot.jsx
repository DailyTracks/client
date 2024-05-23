import "../../styles/Boards.css";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import BoardNavigation from "../../components/board/BoardNavigation";

function BoardsRoot() {
  const navigate = useNavigate();
  const [query] = useSearchParams();

  const changeHandler = (event) => {
    const region = query.get("region");
    navigate(`.?region=${region}&type=${event.target.value}`, {
      replace: true,
    });
  };

  return (
    <div className="boards">
      <BoardNavigation onChange={changeHandler} />
      <Outlet />
    </div>
  );
}

export default BoardsRoot;
