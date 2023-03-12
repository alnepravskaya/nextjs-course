import EventItem from '../EventItem/EventItem';
import classes from './EventList.module.css';

const EventsList = (props) => {
  return (
    <ul className={classes.list}>
      {props.items?.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </ul>
  );
};

export default EventsList;
