import { Form, useSearchParams } from "react-router-dom";
import classes from "../styles/AuthForm.module.css";
import NaverLogin from "./Naver";
import { useEffect, useState } from "react";
import { redirect } from "react-router-dom";
import { authActions } from "../store/auth-slice";
import store from "../store/index";
import axios from "axios";

function AuthForm() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  // const [provider, setProvider] = useState("");
  // const [id, setId] = useState("");
  // const [userId, setUserId] = useState("");
  // const [password, setPassword] = useState("");
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  const [userData, setUserData] = useState({
    provider: "",
    name: "",
    email: "",
    id: "",
  });
  const btnStyle = {
    display: isLogin ? "block" : "none",
  };
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
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>

        {!isLogin ? (
          <>
            <p>
              <label htmlFor="provider">Provider</label>
              <input
                id="provider"
                value={userData.provider}
                type="text"
                name="provider"
                readOnly
              />
            </p>
            <p style={{ display: "none" }}>
              <label htmlFor="id">id</label>
              <input
                id="id"
                value={userData.id}
                type="text"
                name="id"
                readOnly
              />
            </p>
            <p>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                value={userData.name}
                type="text"
                name="username"
                readOnly
              />
            </p>
            <p>
              <label htmlFor="email">Email</label>
              <input
                value={userData.email}
                id="email"
                type="email"
                name="email"
                readOnly
              />
            </p>
            <p>
              <label htmlFor="userId">UserId</label>
              <input
                id="userId"
                type="text"
                name="userId"
                // value={userId}
                // onChange={(e) => setUserId(e.target.value)}
                required
              />
            </p>

            <p>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                required
              />
            </p>
            {/* <button onClick={(e) => createProfile(e)}>확인</button> */}
            {/* <button onClick={createProfile}>확인</button> */}
            <button>저장</button>
          </>
        ) : (
          <>
            <p>
              {/* 추후 userid와 email 동시 운용 */}
              <label htmlFor="email">Email</label>
              <input id="email" type="email" name="email" required />
            </p>

            <p>
              <label htmlFor="password">Password</label>
              <input id="password" type="password" name="password" required />
            </p>

            <NaverLogin />
          </>
        )}

        <div className={classes.actions}>
          <button style={btnStyle} className={classes.login}>
            로그인
          </button>
        </div>
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
      alert("이메일 또는 비밀번호가 유효하지 않습니다.");
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
