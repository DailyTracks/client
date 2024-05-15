import axios from "axios";
import { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import classes from "../styles/UserFollowPage.module.css";

function UserFollowPage() {
  const [users, setUsers] = useState(null);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost:8080/api/user/32/following")
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, [updated]);

  return (
    <>
      {users && (
        <ul className={classes.list}>
          {users.map((user) => (
            <li key={user.id} className={classes.card}>
              <UserCard
                user={user.followee}
                updated={updated}
                setUpdated={setUpdated}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default UserFollowPage;
