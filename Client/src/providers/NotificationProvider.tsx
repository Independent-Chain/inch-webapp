import { ReactNode, createContext, useContext, useState } from 'react';

// Custom components;
import Notification from '@ui/Notification/Notification.tsx';

interface NotificationType {
	type: 'success' | 'error' | string;
	title: string;
	text: string;
	visible?: boolean;
}

interface NotificationContextType {
	showNotification: (
		type: NotificationType['type'], 
		title: NotificationType['title'], 
		text: NotificationType['text']
	) => void;
}

interface ComponentProps {
	children: ReactNode;
}

const NotificationContext = createContext<NotificationContextType | null>(null)

export const NotificationProvider = ({ children }: ComponentProps): ReactNode => {
	const basicNotificationProps: NotificationType = { type: '', title: '', text: '', visible: false }
	const [notification, setNotification] = useState<NotificationType>(basicNotificationProps);

	// Data for hide notification (Empty data);
	const hiddenNotificationData = {
		type: '',
		title: '',
		text: '',
		visible: false
	}

	const showNotification: NotificationContextType['showNotification'] = (type, title, text) => {
		const notificationData: NotificationType = {
			type: type, 
			title: title,
			text: text,
			visible: true
		}

		const hideNotification = () => {
			setTimeout(() => {
				setNotification(hiddenNotificationData);
			}, 3300);
		}

		setNotification(notificationData);
		setTimeout(() => {
			setNotification(hiddenNotificationData);
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