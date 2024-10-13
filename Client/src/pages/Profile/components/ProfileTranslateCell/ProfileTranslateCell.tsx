import { useEffect, useState } from 'react';
import { useHapticFeedback } from '@vkruglikov/react-telegram-web-app';

// Custom hooks;
import { useAuth } from '@providers/AuthProvider.tsx';
import { useData } from '@providers/DataProvider.tsx';
import { useLocalization } from '@providers/LocalizationProvider.tsx';
import { useNotification } from '@providers/NotificationProvider.tsx';

// Custom API;
import { API_USER_LOCALE } from '@API/api.user.locale.ts';

// Custom components;
import Cell from '@ui/Cell/Cell.tsx';
import Icon from '@ui/Icon/Icon.tsx';

// Included styles;
import './ProfileTranslateCell.scss';


interface ComponentProps { }

const ProfileTranslateCell = ({ }: ComponentProps): JSX.Element => {
   const [isFirstRender, setIsFirstRender] = useState(true);

   const [impactOccurred] = useHapticFeedback();

   const { webApp, token } = useAuth();
   const { data, updateExistingField } = useData();
   const { language, localization, updateLocalization } = useLocalization();
   const { showNotification } = useNotification();

   useEffect(() => {
      if (!isFirstRender) {
         showNotification('success', localization.notifications.translated)
      } else {
         setIsFirstRender(false)
      }
   }, [localization])

   const translateApp = async () => {
      try {
         const response = await API_USER_LOCALE(token, webApp, data.appData.locale);
         updateExistingField('metaData', response.metaData);
         updateExistingField('appData', response.appData);
         updateLocalization(response.appData.locale);
      } catch (error) {
         console.log(error)
      }
   }

   return (
      <div className="translate-cell" onClick={() => {
         translateApp();
         impactOccurred('heavy');
      }}>
         <Cell 
            before={
               <img className="tc__icon" src={`/ui-icons/${language}.svg`} alt="" />
            }
            title={ localization.profile.translate }
            after={
               <Icon name="arrow-right-stroke-rounded" size={3.25} unit="vh" color="white" />
            }
         />
      </div>
   )
}

export default ProfileTranslateCell;