import { useRouter } from 'next/router';
import { getEventById } from '../../dummy-data';
import EventSummary from '../../components/eventDetail/EventSummary/EventSummary';
import EventLogistics from '../../components/eventDetail/EventLogistics/EventLogistics';
import EventContent from '../../components/eventDetail/EventContent/EventContent';
import ErrorAlert from '../../components/ui/ErrorAlert/ErrorAlert';

const EventDetailPage = () => {
  const router = useRouter();
  const eventId = router.query.eventId;
  const event = getEventById(eventId);

  return (
    <>
      {!!event ? (
        <div>
          <EventSummary title={event.title}></EventSummary>
          <EventLogistics
            date={event.data}
            address={event.location}
            image={event.image}
            imageAlt={event.title}
          ></EventLogistics>
          <EventContent>{event.description}</EventContent>
        </div>
      ) : (
        <ErrorAlert>
          <p>No event found!</p>
        </ErrorAlert>
      )}
    </>
  );
};

export default EventDetailPage;
