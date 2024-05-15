import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserCard({ user, updated, setUpdated }) {
  // console.log(path);
  const navigate = useNavigate();
  const my = JSON.parse(sessionStorage.getItem("user"));
  const id = my ? my.id : null;

  const followHandler = (e) => {
    if (id === null) {
      navigate("/auth?mode=login");
      return;
    }
    axios
      .post(
        `http://localhost:8080/api/user/${id}/follow?targetUserId=${user.id}`,
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const unfollowHandler = (e) => {
    if (id === null) {
      navigate("/auth?mode=login");
      return;
    }

    const proceed = window.confirm("팔로우 취소를 하시겠습니까");
    if (!proceed) {
      return;
    }

    axios
      .delete(
        `http://localhost:8080/api/user/${id}/follow?targetUserId=${user.id}`
      )
      .then((response) => {
        setUpdated(!updated);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <p>id : {user.id}</p>
      <p>name : {user.username}</p>
      <button onClick={followHandler}>팔로우</button>
      <button onClick={unfollowHandler}>팔로우 취소</button>
    </>
  );
}

export default UserCard;
