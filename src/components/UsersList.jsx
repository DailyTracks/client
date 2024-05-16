import UserCard from "./UserCard";
import { useState } from "react";
import classes from "../styles/UsersList.module.css";

function UsersList({ users }) {
  const [refresh, setRefresh] = useState(false);

  const followUpdateHandler = () => {
    setRefresh(!refresh);
  };

  return (
    <ul className={classes.list}>
      {users.map((user) => (
        <li key={user.id} className={classes.card}>
          <UserCard user={user} onUpdate={followUpdateHandler} />
        </li>
      ))}
    </ul>
  );
}

export default UsersList;
