import { ReactNode } from 'react';

// Custom hooks
import { useAuth } from '@providers/AuthProvider.tsx';
import { useData } from '@providers/DataProvider.tsx';
import { useLocalization } from '@providers/LocalizationProvider.tsx'; 

// Custom API
import { API_DAILY_TAKE } from '@API/api.daily.take.ts';
import { API_USER_GET } from '@API/api.user.get.ts';

// Custom components
import Button from '@ui/Button/Button.tsx';

// Included styles
import './DailyReward.scss';

interface ComponentProps {
  dailyInformation: {
    type: string;
    streak_days: number;
    reward: number;
  };
  stateController: (value: any) => void;
}

const DailyReward = ({ dailyInformation, stateController }: ComponentProps): ReactNode => {
   const { token, webApp } = useAuth();
   const { overwriteData } = useData();
   const { localization } = useLocalization();

   const lcl = localization.daily_reward;

   const handleRewardFetch = async () => {
      try {
         await API_DAILY_TAKE(token, webApp);
         const response = await API_USER_GET(token, webApp);
         overwriteData(response);
         stateController(null);
      } catch (error) {
         console.error("Error fetching reward or user data:", error);
      }
   };

   const renderRewardContent = () => (
      <div className="wrapper">
         <p className="title">{ lcl.title }</p>
         <div className="reward">
            <img className="reward__image" src="/coin.webp" alt="Reward coin" />
            <p className="reward__value">+{dailyInformation.reward} tINCH</p>
         </div>
         <div>
            <p className="daily-reward__description">{ lcl.description }</p>
            <p className="daily-reward__tip">{ lcl.tip }</p>
         </div>
         <Button
            mode="white"
            size="medium"
            haptic={["notification", "success"]}
            style={{
               position: 'absolute',
               bottom: '5vh',
               width: '80%',
               alignSelf: 'center',
               fontSize: '2.4vh',
            }}
            onClick={handleRewardFetch}
         >
            { lcl.button_text }
         </Button>
      </div>
   );

   if (dailyInformation.type === 'newDay' || dailyInformation.type === 'lostDay') {
      return <div className='daily-reward'>
         { renderRewardContent() }
      </div>;
   } else {
      return <></>
   }
};

export default DailyReward;
