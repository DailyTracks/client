import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import classes from "../../styles/BoardNavigation.module.css";
import { useSearchParams } from "react-router-dom";

function BoardNavigation({ onChange }) {
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState("");

  const regionName = searchParams.get("region");

  // const changeHandler = (event) => {
  //   setOrder(event.target.value);
  // };

  return (
    <div className={classes.nav_container}>
      <p className={classes.region}>{regionName}</p>
      <FormControl
        sx={{ m: 1, minWidth: 120 }}
        size="small"
        className={classes.select}
      >
        <InputLabel id="demo-select-small-label">정렬</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={order}
          label="Age"
          onChange={onChange}
        >
          <MenuItem value="recent">최신순</MenuItem>
          <MenuItem value="like">좋아요순</MenuItem>
          <MenuItem value="hit">조회순</MenuItem>
        </Select>
      </FormControl>
    </div>
  );

  // return (
  //   <header className={classes.header}>
  //     <nav className={classes.nav}>
  //       <div>{regionName}</div>
  //       <div className={classes.orders}>
  //         <label htmlFor="order" className={classes.orderlabel}>
  //           정렬
  //         </label>
  //         <div className={classes.select}>
  //           <select name="order" id="order" className={classes.category}>
  //             <option className={classes.option} value="like">
  //               최신순
  //             </option>
  //             <option className={classes.option} value="view">
  //               조회수
  //             </option>
  //             <option className={classes.option} value="like">
  //               좋아요
  //             </option>
  //           </select>
  //           <div className={classes.icon}>
  //             <i className="fa-solid fa-chevron-down"></i>
  //           </div>
  //         </div>
  //       </div>
  //     </nav>
  //   </header>
  // );
}

export default BoardNavigation;
