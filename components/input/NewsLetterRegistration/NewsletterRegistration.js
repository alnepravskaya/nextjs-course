import classes from './NewsletterRegistration.module.css';
import { useContext, useRef, useState } from 'react';
import NotificationContext from '../../../store/notification';

const NewsletterRegistration = () => {
  const { showNotification } = useContext(NotificationContext);
  const [email, setEmail] = useState('');
  const registrationHandler = (event) => {
    event.preventDefault();
    showNotification({
      title: 'Subscribing',
      message: 'Subscribing for updates',
      status: 'pending'
    });

    fetch('api/subscription', {
      method: 'POST',
      body: JSON.stringify({ email: email }),
      headers: {
        'Content-Type': 'application.json'
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
          message: 'Subscribed successfully',
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

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  return (
    <section className={classes.newsletter}>
      <h2>You can subscribe to our lovely email newsletter to not miss new events.</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
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
      </form>
    </section>
  );
};

export default NewsletterRegistration;
