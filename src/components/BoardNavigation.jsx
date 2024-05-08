import classes from "../styles/BoardNavigation.module.css";
import { useSearchParams } from "react-router-dom";

function BoardNavigation() {
  const [searchParams] = useSearchParams();

  const regionName = searchParams.get("region");

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <div>{regionName}</div>
        <div className={classes.orders}>
          <label htmlFor="order" className={classes.orderlabel}>
            정렬
          </label>
          <div className={classes.select}>
            <select name="order" id="order" className={classes.category}>
              <option className={classes.option} value="like">
                최신순
              </option>
              <option className={classes.option} value="view">
                조회수
              </option>
              <option className={classes.option} value="like">
                좋아요
              </option>
            </select>
            <div className={classes.icon}>
              <i className="fa-solid fa-chevron-down"></i>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default BoardNavigation;
