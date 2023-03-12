import { getFeaturedEvents } from '../dummy-data';
import EventsList from '../components/events/EventsList/EventsList';

const HomePage = () => {
  const featuredEvents = getFeaturedEvents();

  return <EventsList items={featuredEvents} />;
};

export default HomePage;
