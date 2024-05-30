import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "../../styles/UserCard.module.css";

function UserCard({ user }) {
  const [isFollow, setIsFollow] = useState(false);
  const [isDone, setIsDone] = useState(false);
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
        setIsDone(true);
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

  const messageHandler = () => {
    if (id === null) {
      navigate("/auth?mode=login");
      return;
    }
    navigate("/chat");
  };
  const getRandomImageUrl = () => {
    const randomValue = Math.random().toString(36).substring(2, 15);
    return `https://source.boringavatars.com/beam?unique=${randomValue}`;
  };

  return (
    <>
      {isDone && (
        <div className={classes.profile_container}>
          <img
            src={getRandomImageUrl()}
            alt="profile"
            className={classes.profile_image}
          />
          <div className={classes.profile_details}>
            <p>id : {user.id}</p>
            <p>name : {user.username}</p>
            <div>
              {!isFollow && (
                <button onClick={followHandler} className={classes.follow_btn}>
                  팔로우
                </button>
              )}
              {isFollow && (
                <button
                  onClick={unfollowHandler}
                  className={classes.unfollow_btn}
                >
                  팔로우 취소
                </button>
              )}
              <button onClick={messageHandler} className={classes.message_btn}>
                메시지
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserCard;
