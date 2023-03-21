import classes from './CommentList.module.css';

const CommentList = (props) => {
  return (
    <ul className={classes.comments}>
      {props.list.map((comment) => (
        <li key={comment._id}>
          <p>{comment.text}</p>
          <div>
            By <address>{comment.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
