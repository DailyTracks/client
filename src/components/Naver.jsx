import NaverIcon from "../asset/btnG_icon.png";

function Naver() {
  const handlerLogin = (e) => {
    window.location.href = process.env.REACT_APP_PROXY + "/api/auth/join/naver";
  };

  const btnStyle = {
    display: "flex",
    alignItems: "center",
    width: "320px",
    height: "56px",
    backgroundColor: "#03c75a",
    border: "none",
    borderRadius: "6px",
  };

  const iconStyle = {
    width: "50px",
    height: "50px",
  };

  const spanStyle = {
    marginLeft: "30px",
    fontWeight: "400",
    fontSize: "18px",
    color: "white",
    // font - size: 14px;
    // line - height: 24px;
  };

  return (
    <>
      {/* <button onClick={(e) => handlerLogin(e)}>네이버로 간편가입하기</button> */}
      <div style={btnStyle} onClick={(e) => handlerLogin(e)}>
        <img src={NaverIcon} style={iconStyle} alt="navericon" />
        <span style={spanStyle}> 네이버로 간편가입하기</span>
      </div>
    </>
  );
}

export default Naver;
