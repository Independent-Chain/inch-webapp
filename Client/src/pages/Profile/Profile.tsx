import { ReactNode, useEffect, useState } from 'react';
import { initUtils } from '@tma.js/sdk';

//  Custom hooks;
import { useAuth } from '@providers/AuthProvider.tsx';
import { useData } from '@providers/DataProvider.tsx';
import { useLocalization } from '@providers/LocalizationProvider.tsx';

// Custom API;
import { API_RATING_USER } from '@API/api.rating.user.ts';
import { API_RATING_HOLDERS } from '@API/api.rating.holders.ts';

// Custom components;
import ProfileUser from './components/ProfileUser/ProfileUser.tsx';
import ProfileCells from './components/ProfileCells/ProfileCells.tsx';
import ProfileFooter from './components/ProfileFooter/ProfileFooter.tsx';
import ProfileTranslateCell from './components/ProfileTranslateCell/ProfileTranslateCell.tsx';
import Loading from '@ui/Loading/Loading.tsx';
import Button from '@ui/Button/Button.tsx';

// Included styles;
import '@pages/page.scss';
import './Profile.scss';


interface ComponentProps { }

const Profile = ({ }: ComponentProps): ReactNode => {
   const [loadingStatus, setLoadingStatus] = useState<boolean>(true);

   const { webApp, token } = useAuth();
   const { data, addParentField, addField } = useData();
   const { localization } = useLocalization();
   const utils = initUtils();

   const invite = {
      text: localization.profile.invite,
      url: `https://t.me/inch_ton_bot/app?startapp=${data.appData.user_id}`, 
   }

   useEffect(() => {
      fetchData();
   }, [])

   const fetchData = async () => {
      await getUserRating();
      await getAllRating();
      setLoadingStatus(false);
   }

   const getUserRating = async () => {
      try {
         const response = await API_RATING_USER(token, webApp);
         addField('appData.rating', response);
      } catch(error) {
         console.log(error)
      }
   }

   const getAllRating = async () => {
      try {
         const response = await API_RATING_HOLDERS(token, webApp);
         addParentField('allRating', response);
      } catch (error) {
         console.log(error);
      }
   }

   if (loadingStatus) {
      return <Loading />
   }

   return (
      <div className="page" id="profile">
         <ProfileUser />
         <Button 
            mode="white" 
            size="medium" 
            haptic={["notification", "success"]} 
            style={{margin: '6px 0'}}
            onClick={() => utils.shareURL(invite.url, invite.text)}
         >
            { localization.profile.invite_button }
         </Button>
         <ProfileTranslateCell />
         <ProfileCells />
         <ProfileFooter />
      </div>
   )
}

export default Profile;