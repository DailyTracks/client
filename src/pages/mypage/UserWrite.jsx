import axios from "axios";
import { useEffect, useState } from "react";
import classes from "../../styles/UserWrite.module.css";
import { useNavigate } from "react-router-dom";

function UserWrite() {
  const [writtenBoard, setWrittenBoard] = useState(null);
  const id = JSON.parse(sessionStorage.getItem("user")).id;

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/user/${id}/written_board`, { withCredentials: true })
      .then((response) => {
        setWrittenBoard(response.data);
      })
      .catch((error) => console.log(error));
    // eslint-disable-next-line
  }, []);

  const detailHandler = (board) => {
    navigate(`/user/mypage/written/${board.id}`, { state: { board: board } });
  };

  return (
    <div>
      {writtenBoard && (
        <ul
          style={{ width: "100%", justifyContent: "center", display: "grid" }}
        >
          {writtenBoard.map((board) => {
            const contentData = JSON.parse(board.content);
            return (
              <li key={board.id} className={classes.board}>
                <div>
                  <p
                    className={classes.title}
                    onClick={() => detailHandler(board)}
                  >
                    {board.title}
                  </p>
                  <p className={classes.content}>{contentData.content}</p>
                  <p className={classes.createdAt}>{board.createdAt}</p>
                </div>

                <img
                  src={contentData.images[0]}
                  alt={contentData.images[0]}
                  className={classes.image}
                />
              </li>
            );
          })}
        </ul>
      )}
      {!writtenBoard && <p>여행일지를 작성해서 남들과 공유해 보아요!</p>}
    </div>
  );
}

export default UserWrite;
