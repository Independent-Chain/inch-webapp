import React, { ReactNode, createContext, useContext, useState } from 'react';
import Notification from '../../components/Notification/Notification';

interface NotificationContextType {
	type: 'success' | 'error' | '';
	title: string;
	text: string;
	visible: boolean;
}
interface ComponentProps {
	children: ReactNode;
}

const NotificationContext = createContext<any>(undefined)

export const NotificationProvider = ({ children }: ComponentProps): JSX.Element => {
	const basicNotificationProps: NotificationContextType = { type: '', title: '', text: '', visible: false }
	const [notification, setNotification] = useState<NotificationContextType>(basicNotificationProps);

	const showNotification = ({ type, title, text }: NotificationContextType) => {
			setNotification({ type: type, title: title, text: text, visible: true });
			setTimeout(() => {
				setNotification({ type: type, title: title, text: text, visible: false });
			}, 3000);
			hideNotification()
	};

	const hideNotification = () => {
		setTimeout(() => {
			setNotification({ type: '', title: '', text: '', visible: false });
		}, 3300);
	}

	return (
			<NotificationContext.Provider value={ showNotification }>
					<Notification type={notification.type} title={notification.title} text={notification.text} visible={notification.visible} />
					{children}
			</NotificationContext.Provider>
	);
};

export const useNotification = () => {
	const context = useContext(NotificationContext);
	if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};