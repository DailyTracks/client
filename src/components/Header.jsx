import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth-slice";
import classes from "../styles/Header.module.css";
import { useEffect } from "react";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (window.sessionStorage.getItem("isLogin") === "true") {
      dispatch(authActions.login());
    } else {
      dispatch(authActions.logout());
    }
  }, []);

  const isLogin = useSelector((state) => state.auth.isLogin);

  function logoutHandler() {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      sessionStorage.removeItem("user");
      sessionStorage.setItem("isLogin", "false");
      dispatch(authActions.logout());
      navigate("/");
    }
  }

  return (
    <header className={classes.header}>
      <Link to="/" className={classes.logo}>
        DailyTasks
      </Link>
      <div className={classes.entryarea}>
        <input className={classes.search} type="text" id="search" required />
        <label className={classes.searchlabel} htmlFor="search">
          장소나 명소를 입력하세요
        </label>
      </div>

      <ul className={classes.auth}>
        {!isLogin && (
          <li>
            <NavLink
              to="/auth?mode=login"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              로그인 및 회원가입
            </NavLink>
          </li>
        )}
        {isLogin && (
          <>
            <li>
              <NavLink
                to="/mypage"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                end
              >
                MyPage
              </NavLink>
            </li>
            <li>
              <button onClick={logoutHandler} className={classes.logout}>
                로그아웃
              </button>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
