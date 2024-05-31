import Header from "../components/Header";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Authentication() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.sessionStorage.getItem("isLogin") === "true") {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />
      <AuthForm />
    </div>
  );
}

export default Authentication;
