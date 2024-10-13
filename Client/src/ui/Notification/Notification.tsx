import { ReactNode } from 'react';

// Included styles;
import './Notification.scss';
import Icon from '@ui/Icon/Icon';

interface ComponentProps {
	type: 'success' | 'error' | string;
	title: string;
	text: string;
	visible?: boolean;
}

const Notification = ({ type, title, text, visible }: ComponentProps): ReactNode => {
   return (
      <div className={`notification ${type} visible-${visible}`}>
         <Icon name="notification-stroke-rounded" size={3.5} unit="vh" color="white" />
         <div className="notification-body">
            <p className="notification-title">{title}</p>
            <p className="notification-text">{text}</p>
         </div>
      </div>
   )
}

export default Notification;