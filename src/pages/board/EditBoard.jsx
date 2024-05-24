import { useRouteLoaderData } from "react-router-dom";
import BoardForm from "../../components/board/BoardForm";
import { useEffect, useState } from "react";

function EditBoard() {
  const [loadedBoard, setLoadedBoard] = useState(null);
  const { board } = useRouteLoaderData("board-detail");

  useEffect(() => {
    board
      .then((result) => {
        console.log(result);
        setLoadedBoard(result);
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
  }, [board]);
  return <>{loadedBoard && <BoardForm method="put" board={loadedBoard} />}</>;
}

export default EditBoard;
