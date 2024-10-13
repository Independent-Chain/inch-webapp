import { ReactNode } from 'react';

// Custom hooks;
import { useAuth } from '@providers/AuthProvider.tsx';
import { useData } from '@providers/DataProvider.tsx';
import { useLocalization } from '@providers/LocalizationProvider.tsx';
import { useNotification } from '@providers/NotificationProvider.tsx';

// Custom components;
import Icon from '@ui/Icon/Icon.tsx';
import Button from '@ui/Button/Button.tsx';
import VerticalLayout from '@ui/Layout/VerticalLayout/VerticalLayout.tsx';

// Custom API;
import { API_MINING_UPGRADE } from '@API/api.mining.upgrade.ts';
import { API_MINING_CLAIM } from '@API/api.mining.claim.ts';

// Custom helpers;
import formatUpgradeConfirm from '@p-upgrades/helpers/formatUpgradeConfirm.ts';

// Included styles;
import './UpgradesCell.scss';


interface ComponentProps {
  deviceId: string;
  title: string;
  description: string;
  level: number;
  parameter: string;
  price: number;
}

const UpgradesCell = ({ deviceId, title, description, level, parameter, price }: ComponentProps): ReactNode => {
   const { webApp, token } = useAuth();
   const { data, updateExistingField } = useData();
   const { localization } = useLocalization();
   const { showNotification } = useNotification();

   const balance: number = data.appData.balance;
   const upgradePrice: string = price.toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
   const upgradeAvailable = balance >= price;

   const successUpgradeNotification = () => {
      showNotification('success', `${title} ${localization.notifications.upgrades.upgraded}`)
   }
   const errorUpgradeNotification = () => {
      showNotification('error', `${title} ${localization.notification.upgrades.not_upgraded}`)
   }

   const upgrade = async () => {
      try {
         await API_MINING_UPGRADE(token, webApp, deviceId);
         const response = await API_MINING_CLAIM(token, webApp);
         updateExistingField('metaData', response.metaData);
         updateExistingField('appData', response.appData);
         successUpgradeNotification();
      } catch (error) {
         console.log(error);
         errorUpgradeNotification();
      }
   };

   const confirmUpgrade = () => {
      const formattedPrice = price.toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 })
      webApp.showConfirm(
         formatUpgradeConfirm(localization.notifications.upgrades.confirm, title, formattedPrice),
         (callback: boolean) => {
            if (callback) {
               upgrade()
            }
         }
      )
   }

   return (
      <div className="cell-device">
         <p className="device-headline">{ title }</p>
         <p className="device-description">{ description }</p>
         <VerticalLayout justify="center" align="start" gap={6}>
            <div className="device-attribute" id="level">
               <Icon name="settings-stroke-rounded" size={2} unit="vh" color="gray" />
               <p className="device-attribute__text">{ level } { localization.upgrades.device.level }</p>
            </div>
            <div className="device-attribute" id="parameter">
               <Icon name="flash-stroke-rounded" size={2} unit="vh" color="gray" />
               <p className="device-attribute__text">{ parameter }</p>
            </div>
            <div className={`device-attribute available-${upgradeAvailable}`} id="price">
               <Icon name="coins-stroke-rounded" size={2} unit="vh" color="gray" />
               <p className="device-attribute__text">${ upgradePrice }</p>
            </div>
         </VerticalLayout>
         <div className="device__button-container">
            <Button 
               disabled={price > balance ? true : false} 
               mode="white" 
               size="medium" 
               haptic={["impact", "soft"]} 
               style={ {marginTop: '8px', padding: '10px', fontSize: '2vh', flexGrow: 1} }
               onClick={ confirmUpgrade }
            >
               { localization.upgrades.device.upgrade }
            </Button>
         </div>
      </div>
   );
};

export default UpgradesCell;
