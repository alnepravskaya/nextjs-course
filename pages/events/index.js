import { getAllEvents } from '../../helpers/api-utils';
import EventsList from '../../components/events/EventsList/EventsList';
import EventsSearch from '../../components/events/EventsSearch/EventsSearch';
import { useRouter } from 'next/router';
import Head from 'next/head';

const EventsPage = (props) => {
  const { events } = props;
  const router = useRouter();
  const findEventsHandler = (year, month) => {
    router.push(`/events/${year}/${month}`);
  };

  return (
    <div>
      <Head>
        <title>All events</title>
        <meta name="description" conten="A lot of great events" />
      </Head>
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
