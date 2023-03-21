import { useRef, useState } from 'react';
import classes from './NewComment.module.css';

const NewComment = (props) => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const sendCommentHandler = (event) => {
    event.preventDefault();

    if (
      !email ||
      email.trim() === '' ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !comment ||
      comment.trim() === ''
    ) {
      setIsInvalid(true);
      return;
    }

    props.onAddComment({
      email: email,
      name: name,
      text: comment
    });
  };

  const clearFormHandler = () => {
    setEmail('');
    setName('');
    setComment('');
  };

  return (
    <form className={classes.form} onSubmit={sendCommentHandler}>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor="email">Your email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={classes.control}>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
      </div>
      <div className={classes.control}>
        <label htmlFor="comment">Your comment</label>
        <textarea
          id="comment"
          rows="5"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
      {isInvalid && <p>Please enter a valid email address and comment!</p>}
      <button className={classes.clear} type="button" onClick={clearFormHandler}>
        Clean form
      </button>
      <button className={classes.submit}>Submit</button>
    </form>
  );
};

export default NewComment;
