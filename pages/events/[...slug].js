import { getFilteredEvents } from '../../helpers/api-utils';
import { useRouter } from 'next/router';
import EventsList from '../../components/events/EventsList/EventsList';
import ResultsTitle from '../../components/events/ResultsTitle/ResultsTitle';
import Button from '../../components/ui/Button/Button';
import ErrorAlert from '../../components/ui/ErrorAlert/ErrorAlert';
import Head from 'next/head';

const FilteredEventPage = (props) => {
  const { filteredEvents, hasError, date } = props;

  const pageHeadData = (
    <Head>
      <title>Filtered Event</title>
      <meta name="description" conten={`All events for ${date.year}/${date.month} `} />
    </Head>
  );

  if (hasError) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter</p>
          <Button link="/">Show all event</Button>
        </ErrorAlert>
      </>
    );
  }

  const filteredDate = new Date(date.year, date.month - 1);

  return (
    <>
      {pageHeadData}

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
