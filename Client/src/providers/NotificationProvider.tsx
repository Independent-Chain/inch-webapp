import { ReactNode, createContext, useContext, useState } from 'react';

// Custom components;
import Notification from '@ui/Notification/Notification.tsx';

interface NotificationType {
	type: 'success' | 'error' | string;
	text: string;
	visible: boolean;
}

interface NotificationContextType {
	showNotification: (
		type: NotificationType['type'],
		text: NotificationType['text']
	) => void;
}

interface ComponentProps {
	children: ReactNode;
}

const NotificationContext = createContext<NotificationContextType | null>(null)

export const NotificationProvider = ({ children }: ComponentProps): ReactNode => {
   const basicNotificationProps: NotificationType = { type: '', text: '', visible: false }
   const [notification, setNotification] = useState<NotificationType>(basicNotificationProps);

   const showNotification: NotificationContextType['showNotification'] = (type, text) => {
      const notificationData: NotificationType = {
         type: type,
         text: text,
         visible: true
      }

      setNotification(notificationData);
      setTimeout(hideNotification, 3000);
   };

   const hideNotification = () => {
      setNotification(prev => ({ ...prev, visible: false }));
      setTimeout(() => {
         setNotification({ type: '', text: '', visible: false });
      }, 300);
   }

   return (
      <NotificationContext.Provider value={{ showNotification }}>
         <Notification
            type={ notification.type }
            text={ notification.text }
            visible={ notification.visible }
            onHide={ hideNotification }
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