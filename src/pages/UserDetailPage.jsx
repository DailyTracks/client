import { useNavigate } from "react-router-dom";
import classes from "../styles/UserDetail.module.css";

function EditUser() {
  const naviagte = useNavigate();
  const userData = JSON.parse(sessionStorage.getItem("user"));

  const editHandler = () => {
    naviagte("edit");
  };

  const deleteHandler = () => {};

  return (
    <>
      <div className={classes.info}>
        <div className={classes.profile}>
          <i className="fa-solid fa-user fa-6x"></i>
        </div>
        <div>
          <p>이름: {userData.username}</p>
          <p>이메일: {userData.email}</p>
          <p>추가정보</p>
        </div>
      </div>
      <div className={classes.button_container}>
        <button className={classes.edit} onClick={editHandler}>
          내 정보 수정하기
        </button>
        <button className={classes.delete} onClick={deleteHandler}>
          탈퇴하기
        </button>
      </div>
    </>
  );
}

export default EditUser;
