function Naver() {
  const handlerLogin = (e) => {
    window.location.href = "http://localhost:8080/api/auth/join/naver";
  };

  return (
    <>
      <button onClick={(e) => handlerLogin(e)}>네이버로 간편가입하기</button>
    </>
  );
}

export default Naver;
