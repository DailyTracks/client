import { useNavigate } from "react-router-dom";

function CommentNavigation() {
  const navigate = useNavigate();

  const backHandler = () => {
    navigate("..");
  };

  return (
    <>
      <button onClick={backHandler}>Back</button>
    </>
  );
}

export default CommentNavigation;
