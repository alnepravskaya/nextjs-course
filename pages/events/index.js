import { getAllEvents } from '../../helpers/api-utils';
import EventsList from '../../components/events/EventsList/EventsList';
import EventsSearch from '../../components/events/EventsSearch/EventsSearch';
import { useRouter } from 'next/router';

const EventsPage = (props) => {
  const { events } = props;
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

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events
    },
    revalidate: 60
  };
}

export default EventsPage;
