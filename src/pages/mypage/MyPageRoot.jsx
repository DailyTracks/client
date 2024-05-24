import { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import classes from "../../styles/MyPage.module.css";

import { message } from "antd";

message.config({
  top: 8,
  duration: 2,
  maxCount: 3,
  rtl: false,
  prefixCls: "my-message",
});

function MyPageRoot() {
  const [messageApi, contextHolder] = message.useMessage();
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

  const info = () => {
    messageApi.success("Hello, Ant Design!");
  };
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
              <>
                {contextHolder}
                <li>
                  <NavLink
                    to={"follower"}
                    className={({ isActive }) =>
                      isActive ? classes.active : undefined
                    }
                    onClick={info}
                    end
                  >
                    <i className="fa-solid fa-user-group"></i>
                    팔로워
                  </NavLink>
                </li>
              </>
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
        </>
      )}
    </>
  );
}

export default MyPageRoot;
