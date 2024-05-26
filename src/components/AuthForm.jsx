import { Form, useSearchParams } from "react-router-dom";
import classes from "../styles/AuthForm.module.css";
import NaverLogin from "./Naver";
import { useEffect, useState } from "react";
import { redirect } from "react-router-dom";
import { authActions } from "../store/auth-slice";
import store from "../store/index";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AuthForm() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const [userData, setUserData] = useState({
    provider: "",
    name: "",
    email: "",
    id: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (searchParams.get("mode") !== "signup") return;

      try {
        const res = await axios.get("/api/auth", {
          withCredentials: true,
        });
        //TODO: 오류 처리해주세요

        console.log(res);
        console.log(res.data);
        console.log(searchParams);

        // const { id, oauth_provider, username, email } = res.data.user;
        // setUserData({
        //   provider: oauth_provider,
        //   name: username,
        //   email: email,
        //   id: id,
        // });
        setUserData({
          provider: searchParams.get("provider"),
          name: searchParams.get("username"),
          email: searchParams.get("email"),
          id: searchParams.get("id"),
        });
        console.log(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Form method="post" className={classes.form}>
        {/* <Form method="post"> */}
        {/* <h1>{isLogin ? "Log in" : "Create a new user"}</h1> */}
        {/* <h1>{isLogin ? null : "Create a new user"}</h1> */}

        {!isLogin ? (
          // <>
          //   <p>
          //     <label htmlFor="provider">Provider</label>
          //     <input
          //       id="provider"
          //       value={userData.provider}
          //       type="text"
          //       name="provider"
          //       readOnly
          //     />
          //   </p>
          //   <p style={{ display: "none" }}>
          //     <label htmlFor="id">id</label>
          //     <input
          //       id="id"
          //       value={userData.id}
          //       type="text"
          //       name="id"
          //       readOnly
          //     />
          //   </p>
          //   <p>
          //     <label htmlFor="username">Username</label>
          //     <input
          //       id="username"
          //       value={userData.name}
          //       type="text"
          //       name="username"
          //       readOnly
          //     />
          //   </p>
          //   <p>
          //     <label htmlFor="email">Email</label>
          //     <input
          //       value={userData.email}
          //       id="email"
          //       type="email"
          //       name="email"
          //       readOnly
          //     />
          //   </p>
          //   <p>
          //     <label htmlFor="userId">UserId</label>
          //     <input
          //       id="userId"
          //       type="text"
          //       name="userId"
          //       // value={userId}
          //       // onChange={(e) => setUserId(e.target.value)}
          //       required
          //     />
          //   </p>

          //   <p>
          //     <label htmlFor="password">Password</label>
          //     <input
          //       id="password"
          //       type="password"
          //       name="password"
          //       // value={password}
          //       // onChange={(e) => setPassword(e.target.value)}
          //       required
          //     />
          //   </p>
          //   {/* <button onClick={(e) => createProfile(e)}>확인</button> */}
          //   {/* <button onClick={createProfile}>확인</button> */}
          //   <button>저장</button>
          // </>
          <>
            <div className={classes.signin_container}>
              <div className={classes.signin}>
                <div className={classes.content}>
                  <h2>Sign Up</h2>
                  <p style={{ color: "whitesmoke" }}>
                    {isLogin
                      ? null
                      : "추가 정보를 입력하고 회원가입을 완료해주세요."}
                  </p>
                  <div className={classes.login_form}>
                    <div className={classes.inputBox}>
                      <input
                        id="provider"
                        value={userData.provider}
                        type="text"
                        name="provider"
                        readOnly
                      />
                      <i>provider</i>
                    </div>
                    <div
                      className={classes.inputBox}
                      style={{ display: "none" }}
                    >
                      <input
                        id="id"
                        value={userData.id}
                        type="text"
                        name="id"
                        readOnly
                      />
                    </div>
                    <div className={classes.inputBox}>
                      <input
                        id="name"
                        value={userData.name}
                        type="text"
                        name="name"
                        readOnly
                      />
                      <i>name</i>
                    </div>
                    <div className={classes.inputBox}>
                      <input
                        value={userData.email}
                        id="email"
                        type="email"
                        name="email"
                        readOnly
                      />
                      <i>Email</i>
                    </div>
                    <div className={classes.inputBox}>
                      <input
                        id="userId"
                        type="text"
                        name="userId"
                        // value={userId}
                        // onChange={(e) => setUserId(e.target.value)}
                        required
                      />
                      <i>Nickname</i>
                    </div>
                    <div className={classes.inputBox}>
                      <input
                        id="password"
                        type="password"
                        name="password"
                        // value={password}
                        // onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <i>Password</i>
                    </div>
                    <div className={classes.inputBox}>
                      <input type="submit" value="저장" />
                      <ToastContainer />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          // <>
          //   <p>
          //     {/* 추후 userid와 email 동시 운용 */}
          //     <label htmlFor="email">Email</label>
          //     <input id="email" type="email" name="email" required />
          //   </p>

          //   <p>
          //     <label htmlFor="password">Password</label>
          //     <input id="password" type="password" name="password" required />
          //   </p>

          //   <NaverLogin />
          // </>
          <>
            <div className={classes.login_container}>
              <div className={classes.signin}>
                <div className={classes.content}>
                  <h2>Sign In</h2>

                  <div className={classes.login_form}>
                    <div className={classes.inputBox}>
                      <input type="email" name="email" required /> <i>Email</i>
                    </div>

                    <div className={classes.inputBox}>
                      <input type="password" name="password" required />
                      <i>Password</i>
                    </div>

                    <div className={classes.inputBox}>
                      <input type="submit" value="Login" />
                      <ToastContainer />
                    </div>
                    <div className={classes.links}>
                      <NaverLogin />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Form>
    </>
  );
}

export default AuthForm;

export async function action({ request, params }) {
  // const method = request.method;
  const data = await request.formData();
  const id = data.get("id");

  const mode = new URL(request.url).searchParams.get("mode");

  if (mode === "signup") {
    const response = await axios.post(
      `/api/user/${id}/profile`,
      {
        userId: data.get("userId"),
        password: data.get("password"),
      },
      {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      },
      { withCredentials: true }
    );

    alert("회원가입이 완료되었습니다. 로그인 해주세요.");

    return redirect("..");
  } else if (mode === "login") {
    const dispatch = store.dispatch;
    const response = await axios.post(
      `/api/auth/login`,
      {
        userId: data.get("email"),
        password: data.get("password"),
      },
      { withCredentials: true }
    );

    if (response.data.message === "로그인 성공") {
      dispatch(authActions.login());
    } else {
      // 로그인 실패
      toast.error("🦄 이메일 또는 비밀번호가 유효하지 않습니다.", {
        position: "top-center",
        autoClose: 1500,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
        hideProgressBar: true,
      });
      // alert("이메일 또는 비밀번호가 유효하지 않습니다.");
      return null;
    }

    console.log(response);
    console.log(response.data);
    sessionStorage.setItem("isLogin", "true");
    sessionStorage.setItem("user", JSON.stringify(response.data.user));

    return redirect("..");
  } else {
    throw new Error({ message: "Auth Mode Error" });
  }
}
