import { useRouter } from 'next/router';
import { getEventById, getAllEvents, getFeaturedEvents } from '../../helpers/api-utils';
import EventSummary from '../../components/eventDetail/EventSummary/EventSummary';
import EventLogistics from '../../components/eventDetail/EventLogistics/EventLogistics';
import EventContent from '../../components/eventDetail/EventContent/EventContent';
import ErrorAlert from '../../components/ui/ErrorAlert/ErrorAlert';
import Head from 'next/head';
import Comments from '../../components/input/Comments/Comments';

const EventDetailPage = (props) => {
  const event = props.event;

  return (
    <>
      {!!event ? (
        <div>
          <Head>
            <title>{event.title}</title>
            <meta name="description" conten={event.description} />
          </Head>
          <EventSummary title={event.title}></EventSummary>
          <EventLogistics
            date={event.date}
            address={event.location}
            image={event.image}
            imageAlt={event.title}
          ></EventLogistics>
          <EventContent>{event.description}</EventContent>
          <Comments eventId={event.id} />
        </div>
      ) : (
        <ErrorAlert>
          <p>No event found!</p>
        </ErrorAlert>
      )}
    </>
  );
};
export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = (await getEventById(eventId)) || null;

  return {
    props: {
      event
    },
    revalidate: 1800
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths,
    fallback: true
  };
}

export default EventDetailPage;
