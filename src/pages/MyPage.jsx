import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function MyPage() {
  const [isLogin, setIsLogin] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (window.sessionStorage.getItem("isLogin") === "true") {
      setIsLogin(true);
    } else {
      navigate("/auth?mode=login");
    }
  }, []);

  return (
    <>
      {isLogin && (
        <>
          <Header />
          <p>MyPage</p>
        </>
      )}
    </>
  );
}

export default MyPage;
