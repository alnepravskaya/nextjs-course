import { useEffect, useState } from 'react';

import CommentList from '../CommentList/CommentList';
import NewComment from '../NewComment/NewComment';
import classes from './Comments.module.css';

const Comments = (props) => {
  const { eventId } = props;
  const [comments, setComments] = useState([]);
  const [isCommentsShown, setIsCommentsShown] = useState(false);
  const [isCommentSend, setIsCommentSend] = useState(false);

  const toggleCommentsHandler = () => {
    setIsCommentsShown((prevStatus) => !prevStatus);
  };

  const getAllComments = () => {
    fetch(`/api/comments/${eventId}`)
      .then((response) => response.json())
      .then((data) => setComments(data.comments));
  };

  useEffect(() => {
    if (isCommentsShown) {
      getAllComments();
    }
  }, [isCommentsShown]);

  const addCommentHandler = (commentData) => {
    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Added comment') {
          getAllComments();
          setIsCommentSend(true);
          setTimeout(() => {
            setIsCommentSend(false);
          }, 10000);
        }
      });
  };

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>{isCommentsShown ? 'Hide' : 'Show'} Comments</button>
      {isCommentsShown && (
        <NewComment onAddComment={addCommentHandler} className={classes.comment} />
      )}
      {isCommentSend && <p className={classes.text}>You comments send successfully</p>}
      {isCommentsShown && <CommentList list={comments} cl />}
    </section>
  );
};

export default Comments;
