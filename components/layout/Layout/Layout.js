import MainHeader from '../MainHeader/MainHeader';
import Notification from '../../ui/Notification/Notification';
import NotificationContext from '../../../store/notification';
import { useContext } from 'react';

const Layout = (props) => {
  const { notification } = useContext(NotificationContext);

  return (
    <>
      <MainHeader />
      <main>{props.children}</main>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
    </>
  );
};

export default Layout;
