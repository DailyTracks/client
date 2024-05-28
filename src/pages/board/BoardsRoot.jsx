import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import BoardNavigation from "../../components/board/BoardNavigation";
import { useState } from "react";
import classes from "../../styles/BoardRoot.module.css";
import { motion } from "framer-motion";

function BoardsRoot() {
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const [order, setOrder] = useState();

  const changeHandler = (event) => {
    const region = query.get("region");
    setOrder(event.target.value);
    navigate(`.?region=${region}&type=${event.target.value}`, {
      replace: true,
    });
  };

  return (
    <motion.div
      className={classes.board_root}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        type: "spring",
        duration: "1",
      }}
    >
      <BoardNavigation onChange={changeHandler} order={order} />
      <Outlet />
    </motion.div>
    // <div className={classes.board_root}>
    //   <BoardNavigation onChange={changeHandler} order={order} />
    //   <Outlet />
    // </div>
  );
}

export default BoardsRoot;
