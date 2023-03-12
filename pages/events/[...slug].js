import { getFilteredEvents } from '../../dummy-data';
import { useRouter } from 'next/router';
import EventsList from '../../components/events/EventsList/EventsList';
import ResultsTitle from '../../components/events/ResultsTitle/ResultsTitle';
import Button from '../../components/ui/Button/Button';
import ErrorAlert from '../../components/ui/ErrorAlert/ErrorAlert';

const FilteredEventPage = () => {
  const router = useRouter();
  const filterData = router.query?.slug;

  if (!filterData) {
    return <p>Loading...</p>;
  }
  const year = Number(filterData[0]);
  const month = Number(filterData[1]);
  if (isNaN(year) || isNaN(month) || month < 0 || month > 12) {
    return (
      <ErrorAlert>
        <p>Invalid filter</p>
        <Button link="/">Show all event</Button>
      </ErrorAlert>
    );
  }

  const date = new Date(year, month - 1);

  const filteredEvents = getFilteredEvents({ year, month });

  return (
    <>
      <ResultsTitle date={date} />

      {!filteredEvents || filteredEvents.length === 0 ? (
        <>
          <ErrorAlert>
            <h2>No events</h2>
          </ErrorAlert>
        </>
      ) : (
        <EventsList items={filteredEvents} />
      )}
    </>
  );
};
export default FilteredEventPage;
