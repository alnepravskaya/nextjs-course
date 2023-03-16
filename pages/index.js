import { getFeaturedEvents } from '../helpers/api-utils';
import EventsList from '../components/events/EventsList/EventsList';

const HomePage = (props) => {
  return <EventsList items={props.events} />;
};

export async function getStaticProps() {
  const featuredEvent = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvent
    },
    revalidate: 1800
  };
}

export default HomePage;
