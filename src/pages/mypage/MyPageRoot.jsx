import { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import classes from "../../styles/MyPage.module.css";

function MyPageRoot() {
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
        <div>
          <Header />
          <div style={{ marginTop: "10px", display: "flex" }}>
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
                    to={"following"}
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
                    to={"follower"}
                    className={({ isActive }) =>
                      isActive ? classes.active : undefined
                    }
                    end
                  >
                    <i className="fa-solid fa-user-group"></i>
                    팔로워
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"written"}
                    className={({ isActive }) =>
                      isActive ? classes.active : undefined
                    }
                    end
                  >
                    <i className="fa-regular fa-newspaper"></i>
                    나의 글
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
            <div style={{ width: "100%" }}>
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MyPageRoot;
