import { getFilteredEvents } from '../../helpers/api-utils';
import { useRouter } from 'next/router';
import EventsList from '../../components/events/EventsList/EventsList';
import ResultsTitle from '../../components/events/ResultsTitle/ResultsTitle';
import Button from '../../components/ui/Button/Button';
import ErrorAlert from '../../components/ui/ErrorAlert/ErrorAlert';

const FilteredEventPage = (props) => {
  const { filteredEvents, hasError, date } = props;
  console.log(props);
  if (hasError) {
    return (
      <ErrorAlert>
        <p>Invalid filter</p>
        <Button link="/">Show all event</Button>
      </ErrorAlert>
    );
  }

  const filteredDate = new Date(date.year, date.month - 1);

  return (
    <>
      <ResultsTitle date={filteredDate} />

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

export async function getServerSideProps(context) {
  const { params } = context;
  const filterData = params.slug;
  const year = Number(filterData[0]);
  const month = Number(filterData[1]);
  if (isNaN(year) || isNaN(month) || month < 0 || month > 12) {
    return { hasError: true };
  }

  const filteredEvents = await getFilteredEvents({ year, month });

  return {
    props: {
      filteredEvents,
      date: {
        year,
        month
      }
    }
  };
}

export default FilteredEventPage;
