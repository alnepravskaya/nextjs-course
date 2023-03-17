import Image from 'next/image';
import classes from './EventItem.module.css';
import Button from '../../ui/Button/Button';
import DateIcon from '../../icons/DateIcon';
import AddressIcon from '../../icons/AddressIcon';
import ArrowRightIcon from '../../icons/ArrowRightIcon';

const EventItem = (props) => {
  const { title, image, date, location, id } = props.event;

  return (
    <li className={classes.item}>
      <Image src={'/' + image} alt={title} width={250} height={160} />
      <div className={classes.content}>
        <div>
          <h2>{title}</h2>
        </div>
        <div className={classes.date}>
          <DateIcon />
          <time>{new Date(date).toLocaleDateString('en-US')}</time>
        </div>
        <div className={classes.address}>
          <AddressIcon />
          <address>{location}</address>
        </div>
        <div className={classes.actions}>
          <Button link={`/events/${id}`}>
            <span>Explore event </span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
      {props.event.name}
    </li>
  );
};

export default EventItem;
