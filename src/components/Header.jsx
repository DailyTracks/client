import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth-slice";
import classes from "../styles/Header.module.css";

function Header() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const dispatch = useDispatch();

  function logoutHandler() {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      dispatch(authActions.logout());
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
                to="/user/profile"
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
