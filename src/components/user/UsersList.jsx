import UserCard from "./UserCard";
import classes from "../../styles/UsersList.module.css";

function UsersList({ users }) {
  return (
    <div className={classes.list_container}>
      <ul className={classes.list}>
        {users.map((user) => (
          <li key={user.id} className={classes.card}>
            <UserCard user={user} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;
