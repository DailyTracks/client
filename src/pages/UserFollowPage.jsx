import axios from "axios";
import { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import classes from "../styles/UserFollowPage.module.css";

function UserFollowPage() {
  const [users, setUsers] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost:8080/api/user/32/following")
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
    };
    fetchData();
  }, [refresh]);

  const followUpdateHandler = () => {
    setRefresh(!refresh);
  };

  return (
    <>
      {users && (
        <ul className={classes.list}>
          {users.map((user) => (
            <li key={user.id} className={classes.card}>
              <UserCard user={user.followee} onUpdate={followUpdateHandler} />
            </li>
          ))}
        </ul>
      )}
      {!users && (
        <>
          <p>유저를 팔로우하세요!</p>
        </>
      )}
    </>
  );
}

export default UserFollowPage;
