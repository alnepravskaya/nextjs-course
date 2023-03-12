import { getAllEvents } from '../../dummy-data';
import EventsList from '../../components/events/EventsList/EventsList';
import EventsSearch from '../../components/events/EventsSearch/EventsSearch';
import { useRouter } from 'next/router';

const EventsPage = () => {
  const events = getAllEvents();
  const router = useRouter();
  const findEventsHandler = (year, month) => {
    router.push(`/events/${year}/${month}`);
  };

  return (
    <div>
      <EventsSearch onSearch={findEventsHandler} />
      <EventsList items={events} />
    </div>
  );
};

export default EventsPage;
