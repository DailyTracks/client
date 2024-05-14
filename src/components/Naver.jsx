import NaverLoginImage from "../asset/btnG_Naver.png";

function Naver() {
  const handlerLogin = (e) => {
    window.location.href = "http://localhost:8080/api/auth/join/naver";
  };

  const imgStyle = {
    cursor: "pointer",
    width: "200px",
    height: "60px",
  };

  return (
    <>
      <img
        src={NaverLoginImage}
        alt="naver login"
        style={imgStyle}
        onClick={(e) => handlerLogin(e)}
      />
      <button onClick={(e) => handlerLogin(e)}>네이버로 간편가입하기</button>
    </>
  );
}

export default Naver;
