import { Link, NavLink } from "react-router-dom";
import classes from "../styles/Header.module.css";

function Header() {
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
        <li>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            end
          >
            로그인
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            end
          >
            회원가입
          </NavLink>
        </li>
      </ul>
    </header>
  );
}

export default Header;
