import axios from "axios";
import { useEffect, useState } from "react";
import UserCard from "../../components/user/UserCard";
import classes from "../../styles/UserFollowPage.module.css";

function UserFollowerPage() {
  const [users, setUsers] = useState(null);
  const id = JSON.parse(sessionStorage.getItem("user")).id;

  useEffect(() => {
    axios
      .get(`/api/user/${id}/follower`)
      .then((response) => {
        if (response.data.length === 0) {
          setUsers(null);
          return;
        }
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {users && (
        <ul className={classes.list}>
          {users.map((user) => (
            <li key={user.id} className={classes.card}>
              <UserCard user={user} />
            </li>
          ))}
        </ul>
      )}
      {!users && (
        <>
          <p>나를 팔로우한 유저가 아직 없어요!</p>
        </>
      )}
    </>
  );
}

export default UserFollowerPage;
