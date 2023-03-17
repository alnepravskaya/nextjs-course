import { getFeaturedEvents } from '../helpers/api-utils';
import EventsList from '../components/events/EventsList/EventsList';
import Head from 'next/head';

const HomePage = (props) => {
  return (
    <div>
      <Head>
        <title>NextJs events</title>
        <meta name="description" conten="A lot of great events" />
      </Head>
      <EventsList items={props.events} />
    </div>
  );
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
