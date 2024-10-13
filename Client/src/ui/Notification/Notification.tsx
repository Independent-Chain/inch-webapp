import { ReactNode } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useHapticFeedback } from '@vkruglikov/react-telegram-web-app';

// Custom components;
import Icon from '@ui/Icon/Icon';
import Text from '@ui/Typography/Text/Text';

// Included styles;
import './Notification.scss';


const notificationMap: Record<string, Record<ComponentProps['type'], string>> = {
   icon: {
      success: 'checkmark-circle-stroke-rounded',
      error: 'cancel-circle-stroke-rounded',
   },
   color: {
      success: 'accent',
      error: 'error',
   }
};

interface ComponentProps {
	type: 'success' | 'error' | string;
	text: string;
	visible: boolean;
   onHide: () => void;
}

const Notification = ({ type, text, visible, onHide }: ComponentProps): ReactNode => {
   const [impactOccurred] = useHapticFeedback();

   const handlers = useSwipeable({
      onSwipedUp: () => {
         impactOccurred("light")
         onHide();
      }
   });

   return (
      <div {...handlers} className={`notification ${type} visible-${visible}`}>
         <Icon name={ notificationMap['icon'][type] } size={2.7} unit="vh" color={ notificationMap['color'][type] } />
         <Text color="white" >{ text }</Text>
      </div>
   )
}

export default Notification;