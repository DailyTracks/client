import BoardForm from "../../components/BoardForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NewBoard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.sessionStorage.getItem("isLogin") !== "true") {
      navigate("/auth?mode=login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <BoardForm method="post" />;
}

export default NewBoard;
