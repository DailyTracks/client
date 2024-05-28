import classes from "../../styles/BoardNavigation.module.css";
import { useLocation, useSearchParams } from "react-router-dom";

function BoardNavigation({ onChange, order }) {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const regionName = searchParams.get("region");

  if (location.pathname !== "/board") {
    return <></>;
  }

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <p className={classes.region}>{regionName}</p>
        <div className={classes.orders}>
          <label htmlFor="order" className={classes.orderlabel}>
            정렬
          </label>
          <div className={classes.select}>
            <select
              name="order"
              id="order"
              className={classes.category}
              value={order}
              onChange={onChange}
            >
              <option className={classes.option} value="recent">
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
