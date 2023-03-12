import Link from 'next/link';
import classes from './Button.module.css';

const Button = (props) => {
  return (
    <>
      {props.link ? (
        <Link href={props.link} className={classes.btn}>
          {props.children}
        </Link>
      ) : (
        <button onClick={props.onClick} className={classes.btn}>
          {props.children}
        </button>
      )}
    </>
  );
};

export default Button;
