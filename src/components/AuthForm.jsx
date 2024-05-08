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

function AuthForm() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  const btnStyle = {
    display: isLogin ? "block" : "none",
  };

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        {!isLogin && (
          <p>
            <label htmlFor="username">Username</label>
            <input id="username" type="text" name="username" required />
          </p>
        )}
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "회원가입 하러가기" : "로그인"}
          </Link>
          <button style={btnStyle}>{isLogin ? "로그인" : "회원가입"}</button>
        </div>
        <NaverLogin />
      </Form>
    </>
  );
}

export default AuthForm;
