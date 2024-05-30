import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth-slice";
import classes from "../styles/Header.module.css";
import { useEffect, useState } from "react";
import { Modal } from "antd";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    setIsModalVisible(true);

    // if (window.confirm("로그아웃 하시겠습니까?")) {
    //   sessionStorage.removeItem("user");
    //   sessionStorage.setItem("isLogin", "false");
    //   dispatch(authActions.logout());
    //   navigate("/");
    // }
  }

  const handleOk = () => {
    sessionStorage.removeItem("user");
    sessionStorage.setItem("isLogin", "false");
    dispatch(authActions.logout());
    setIsModalVisible(false);
    navigate("/");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const inputHandler = (event) => {
    setSearchText(event.target.value);
  };

  const enterHandler = (event) => {
    if (event.key === "Enter") {
      navigate(`/search?name=${searchText}`);
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
        DailyTracks
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
        <label
          className={classes.searchlabel}
          htmlFor="search"
          title="유저를 검색하세요!"
        >
          유저를 검색하세요!
        </label>
      </div>

      <ul className={classes.auth}>
        {!isLogin && (
          <li className={classes.navLink}>
            <NavLink
              to="/auth?mode=login"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              로그인
            </NavLink>
          </li>
        )}
        {isLogin && (
          <>
            <li>
              <span style={{ color: "whitesmoke" }}>
                <i
                  className="fa-brands fa-facebook-messenger fa-2x"
                  onClick={chatHandler}
                  style={chatStyle}
                ></i>
                {/* <i
                  className="fa-regular fa-paper-plane fa-2x"
                  onClick={chatHandler}
                  style={chatStyle}
                ></i> */}
                {/* <i className="fa-brands fa-rocketchat fa-2x"></i> */}
              </span>
            </li>
            <li className={classes.navLink}>
              <NavLink
                to="/user/mypage"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                // end
              >
                MyPage
              </NavLink>
            </li>
            <li>
              <button onClick={logoutHandler} className={classes.logout}>
                로그아웃
              </button>
              <Modal
                title="로그아웃"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <p>로그아웃 하시겠습니까?</p>
              </Modal>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
