import { ReactNode } from 'react';

import IconNotification from '../../icons/IconNotification';

// Included styles;
import './Notification.scss';

interface ComponentProps {
	type: 'success' | 'error' | string;
	title: string;
	text: string;
	visible?: boolean;
}

const Notification = ({ type, title, text, visible }: ComponentProps): ReactNode => {
	return (
		<div className={`notification ${type} visible-${visible}`}>
			<IconNotification size={6} />
			<div className="notification-body">
				<p className="notification-title">{title}</p>
				<p className="notification-text">{text}</p>
			</div>
		</div>
	)
}

export default Notification;