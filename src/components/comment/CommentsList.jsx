import Comment from "./Comment";

function CommentsList({ comments }) {
  
  return (
    <>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </>
  );
}

export default CommentsList;
