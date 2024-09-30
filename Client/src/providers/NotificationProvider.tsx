import React, { ReactNode, createContext, useContext, useState } from 'react';
import Notification from '../ui/Notification/Notification';

interface NotificationContextType {
	showNotification: (type: Notification['type'], title: string, text: string) => void;
}
interface Notification {
	type: 'success' | 'error' | '';
	title: string;
	text: string;
	visible?: boolean;
}
interface ComponentProps {
	children: ReactNode;
}

const NotificationContext = createContext<NotificationContextType | null>(null)

export const NotificationProvider = ({ children }: ComponentProps): JSX.Element => {
	const basicNotificationProps: Notification = { type: '', title: '', text: '', visible: false }
	const [notification, setNotification] = useState<Notification>(basicNotificationProps);

	const showNotification = (type: Notification['type'], title: string, text: string) => {
		const hideNotification = () => {
			setTimeout(() => {
				setNotification({ type: '', title: '', text: '', visible: false });
			}, 3300);
		}

		setNotification({ type: type, title: title, text: text, visible: true });
		setTimeout(() => {
			setNotification({ type: type, title: title, text: text, visible: false });
		}, 3000);
		hideNotification()
	};

	return (
			<NotificationContext.Provider value={{ showNotification }}>
					<Notification 
						type={ notification.type }
						title={ notification.title }
						text={ notification.text }
						visible={ notification.visible } 
					/>
					{ children }
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