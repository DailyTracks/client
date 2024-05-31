import Map from "../components/Map";
import Header from "../components/Header";
import classes from "../styles/Home.module.css";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";

function Home() {
  return (
    <div>
      <Header />
      <NavigationBar />
      <main className={classes.home}>
        <Map />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
