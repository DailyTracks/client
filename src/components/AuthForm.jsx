// import { Form, Link, useSearchParams } from "react-router-dom";

// import classes from "../styles/AuthForm.module.css";
// import Naver from "./Naver";

// function AuthForm() {
//   const [searchParams] = useSearchParams();
//   const isLogin = searchParams.get("mode") === "login";

//   return (
//     <>
//       <Form method="post" className={classes.form}>
//         <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
//         <p>
//           <label htmlFor="email">Email</label>
//           <input id="email" type="email" name="email" required />
//         </p>
//         {!isLogin && (
//           <p>
//             <label htmlFor="username">Username</label>
//             <input id="username" type="text" name="username" required />
//           </p>
//         )}
//         <p>
//           <label htmlFor="image">Password</label>
//           <input id="password" type="password" name="password" required />
//         </p>
//         <div className={classes.actions}>
//           <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
//             {isLogin ? "Create new user" : "Login"}
//           </Link>
//           <button>Save</button>
//         </div>
//         <Naver />
//       </Form>
//     </>
//   );
// }

// export default AuthForm;

import { Form, Link, useSearchParams } from "react-router-dom";

import classes from "../styles/AuthForm.module.css";
import NaverLogin from "./Naver";
import { useEffect, useState } from "react";
import axios from "axios";
function AuthForm() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const [provider, setProvider] = useState("");
  const [id, setId] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const btnStyle = {
    display: isLogin ? "block" : "none",
  };
  useEffect(() => {
    const fetchData = async () => {
      if (searchParams.get("mode") !== "signup") return;

      try {
        const res = await axios.get("http://localhost:8080/api/auth", {
          withCredentials: true,
        });
        //TODO: 오류 처리해주세요

        const { id, oauth_provider, username, email } = res.data.user;
        console.log(id, oauth_provider, username, email);
        setProvider(oauth_provider);
        setName(username);
        setEmail(email);
        setId(id);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const createProfile = async (e) => {
    const res = await axios.post(
      `http://localhost:8080/api/user/${id}/profile`,
      {
        userId: userId,
        password: password,
      }
    );
    console.log(res.data);
  };
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
                value={provider}
                type="text"
                name="provider"
                readOnly
              />
            </p>
            <p>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                value={name}
                type="text"
                name="username"
                readOnly
              />
            </p>
            <p>
              <label htmlFor="email">Email</label>
              <input
                value={email}
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
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </p>

            <p>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </p>
            <button onClick={(e) => createProfile(e)}>확인</button>
          </>
        ) : (
          <>
            <p>
              {/* 추후 userid와 email 동시 운용 */}
              <label htmlFor="userId">Email</label>
              <input
                id="userId"
                type="text"
                name="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </p>

            <p>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </p>

            <NaverLogin />
          </>
        )}

        <div className={classes.actions}>
          <button style={btnStyle}>{isLogin ? "로그인" : "회원가입"}</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
