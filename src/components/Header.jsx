import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth-slice";
import classes from "../styles/Header.module.css";
import { useEffect, useState } from "react";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (window.sessionStorage.getItem("isLogin") === "true") {
      dispatch(authActions.login());
    } else {
      dispatch(authActions.logout());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const inputHandler = (event) => {
    setSearchText(event.target.value);
  };

  const enterHandler = (event) => {
    if (event.key === "Enter") {
      navigate(`/search?q=${searchText}`);
    }
  };

  const chatHandler = (event) => {
    navigate("/chat");
  };

  const chatStyle = {
    cursor: "pointer",
  };

  return (
    <header className={classes.header}>
      <Link to="/" className={classes.logo}>
        DailyTasks
      </Link>
      <div className={classes.entryarea}>
        <input
          className={classes.search}
          type="text"
          id="search"
          value={searchText}
          onChange={inputHandler}
          onKeyDown={enterHandler}
          required
        />
        <label className={classes.searchlabel} htmlFor="search">
          {/* 장소나 명소를 입력하세요 */}
          유저를 검색하세요!
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
              <i
                class="fa-brands fa-rocketchat fa-2x"
                onClick={chatHandler}
                style={chatStyle}
              ></i>
            </li>
            <li>
              <NavLink
                to="/user/mypage"
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
