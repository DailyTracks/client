import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserCard({ user }) {
  const [isFollow, setIsFollow] = useState(false);
  const navigate = useNavigate();
  const my = JSON.parse(sessionStorage.getItem("user"));
  const id = my ? my.id : null;

  useEffect(() => {
    if (id === null) return;

    axios
      .get(`/api/user/follow?userId=${id}&targetUserId=${user.id}`, {
        withCredentials: true,
      })
      .then((response) => {
        const follow = response.data.isFollow;
        if (follow) {
          setIsFollow(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const followHandler = (e) => {
    if (id === null) {
      navigate("/auth?mode=login");
      return;
    }
    axios
      .post(`/api/user/${id}/follow?targetUserId=${user.id}`, {
        withCredentials: true,
      })
      .then((response) => {
        navigate(".", { replace: true });
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
      .delete(`/api/user/${id}/follow?targetUserId=${user.id}`)
      .then((response) => {
        setIsFollow(false);
        // setUpdated(!updated);
        // window.location.reload();
        navigate(".", { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <p>id : {user.id}</p>
      <p>name : {user.username}</p>
      {!isFollow && (
        <button
          onClick={followHandler}
          style={{ backgroundColor: "lightblue" }}
        >
          팔로우
        </button>
      )}
      {isFollow && (
        <button onClick={unfollowHandler} style={{ backgroundColor: "red" }}>
          팔로우 취소
        </button>
      )}
    </>
  );
}

export default UserCard;
