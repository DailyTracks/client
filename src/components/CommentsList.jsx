import Comment from "./Comment";

function CommentsList({ comments }) {
  return (
    <>
      <h3>Comments List</h3>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </>
  );
}

export default CommentsList;
