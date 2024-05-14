import {
  Await,
  defer,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";
import classes from "../styles/UserDetail.module.css";
import axios from "axios";
import { Suspense } from "react";

function EditUser() {
  const navigate = useNavigate();
  const id = JSON.parse(sessionStorage.getItem("user")).id;
  const { user } = useRouteLoaderData("user");

  const editHandler = () => {
    navigate("edit");
  };

  const deleteHandler = () => {
    const proceed = window.confirm("정말 탈퇴하시겠습니까?");

    if (proceed) {
      axios
        .delete(`http://localhost:8080/api/user/${id}`, {
          withCredentials: true,
        })
        .then(() => {
          sessionStorage.removeItem("user");
          sessionStorage.setItem("isLogin", "false");
          navigate("/");
        });
    }
  };

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={user}>
          {(userData) => (
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
          )}
        </Await>
      </Suspense>
    </>
  );
}

export default EditUser;

async function loadUser() {
  const id = JSON.parse(sessionStorage.getItem("user")).id;
  let url = `http://localhost:8080/api/user/${id}`;
  const response = await axios.get(url, {
    withCredentials: true,
  });

  const resData = await response.data;
  return resData;
}

export function loader() {
  return defer({
    user: loadUser(),
  });
}
