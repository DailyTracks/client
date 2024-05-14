import { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import classes from "../styles/MyPage.module.css";

function MyPage() {
  const [isLogin, setIsLogin] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (window.sessionStorage.getItem("isLogin") === "true") {
      setIsLogin(true);
    } else {
      navigate("/auth?mode=login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLogin && (
        <>
          <Header />

          <div className={classes.leftNav}>
            <ul>
              <li>
                <NavLink
                  to=""
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                  end
                >
                  <i className="fa-regular fa-user"></i>내 정보
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"follow"}
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                  end
                >
                  <i className="fa-solid fa-user-group"></i>
                  팔로우
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"nothing"}
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                  end
                >
                  <i className="fa-solid fa-plus"></i>
                  추가 정보
                </NavLink>
              </li>
            </ul>
          </div>
          <Outlet />
          {/* <div className={classes.info}>
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
            <button className={classes.edit}>내 정보 수정하기</button>
            <button className={classes.delete}>탈퇴하기</button>
          </div> */}
        </>
      )}
    </>
  );
}

export default MyPage;
