import Header from "../components/Header";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../components/Footer";

function Authentication() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.sessionStorage.getItem("isLogin") === "true") {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={
        {
          // backgroundColor: "#a2a2a2",
        }
      }
    >
      <Header />
      <AuthForm />
      {/* <Footer /> */}
    </div>
  );
}

export default Authentication;
