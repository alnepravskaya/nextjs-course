import { useContext, useEffect, useState } from 'react';

import CommentList from '../CommentList/CommentList';
import NewComment from '../NewComment/NewComment';
import classes from './Comments.module.css';
import NotificationContext from '../../../store/notification';

const Comments = (props) => {
  const { eventId } = props;
  const { showNotification } = useContext(NotificationContext);
  const [comments, setComments] = useState([]);
  const [isCommentsShown, setIsCommentsShown] = useState(false);
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  const toggleCommentsHandler = () => {
    setIsCommentsShown((prevStatus) => !prevStatus);
  };

  const getAllComments = () => {
    setIsFetchingComments(true);
    fetch(`/api/comments/${eventId}`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data.comments);
        setIsFetchingComments(false);
      });
  };

  useEffect(() => {
    if (isCommentsShown) {
      getAllComments();
    }
  }, [isCommentsShown]);

  const addCommentHandler = (commentData) => {
    showNotification({
      title: 'Sending comment..',
      message: 'Sending comment..',
      status: 'pending'
    });

    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((data) => {
          throw new Error(data.message || 'Something went wrong!');
        });
      })
      .then((data) => {
        showNotification({
          title: 'Success',
          message: 'New comment added successfully',
          status: 'success'
        });
      })
      .catch((error) => {
        showNotification({
          title: 'Error',
          message: error.message || 'Something went wrong',
          status: 'error'
        });
      });
  };

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>{isCommentsShown ? 'Hide' : 'Show'} Comments</button>
      {isCommentsShown && (
        <NewComment onAddComment={addCommentHandler} className={classes.comment} />
      )}
      {isCommentsShown && (isFetchingComments ? 'Loading...' : <CommentList list={comments} />)}
    </section>
  );
};

export default Comments;
