import NavigationBar from "../components/NavigationBar";
import Map from "../components/Map";
import Header from "../components/Header";
import classes from "../styles/Home.module.css";
import { Outlet } from "react-router-dom";

function Home() {
  console.log(process.env.REACT_APP_PROXY);
  return (
    <>
      <Header />
      <NavigationBar />;
      <main className={classes.home}>
        <Map />
        <Outlet />
      </main>
    </>
  );
}

export default Home;
