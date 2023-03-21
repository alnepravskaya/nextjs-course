import classes from './NewsletterRegistration.module.css';
import { useRef, useState } from 'react';

const NewsletterRegistration = () => {
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const registrationHandler = (event) => {
    event.preventDefault();

    fetch('api/subscription', {
      method: 'POST',
      body: JSON.stringify({ email: email }),
      headers: {
        'Content-Type': 'application.json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Subscribed successfully') {
          setEmail('');
          setIsSuccess(true);
          setTimeout(() => {
            setIsSuccess(false);
          }, 5000);
        } else {
          setError(data.message);
          setTimeout(() => {
            setError('');
          }, 5000);
        }
      });
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  return (
    <section className={classes.newsletter}>
      <h2>You can subscribe to our lovely email newsletter to not miss new events.</h2>
      <form onSubmit={registrationHandler}>
        <div
          className={`${classes.control} ${isSuccess || !!error ? classes['space-collapse'] : ''}`}
        >
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            onChange={emailHandler}
            value={email}
          />
          <button>Subscribe</button>
        </div>

        {isSuccess && <p className={classes.text}> You subscribed successfully</p>}
        {error && <p className={classes.text}> {error}</p>}
      </form>
    </section>
  );
};

export default NewsletterRegistration;
