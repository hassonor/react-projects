

const CommentsList = ({comments}) =>(
    <>
        <h3>Comments:</h3>
    {comments.map((comment,key) =>(
        <div className="comment" key={key}>
            <h3>{comment.username}</h3>
            <p>{comment.text}</p>
        </div>
        ))}
    </>
)

export default CommentsList;
