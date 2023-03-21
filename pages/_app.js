import '../styles/globals.css';
import Layout from '../components/layout/Layout/Layout';
import Head from 'next/head';
import { NotificationContextProvider } from '../store/notification';

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <meta name="viewport" content="initial-scale=1.0, with=device-width" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}

export default MyApp;
