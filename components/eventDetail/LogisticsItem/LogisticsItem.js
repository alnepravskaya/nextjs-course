import classes from './LogisticsItem.module.css';

function LogisticsItem(props) {
  const { icon: Icon } = props;

  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        <Icon />
      </span>
      <span>{props.children}</span>
    </li>
  );
}

export default LogisticsItem;
