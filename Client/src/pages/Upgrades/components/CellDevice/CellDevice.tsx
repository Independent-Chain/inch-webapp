import React from 'react';

// Custom hooks;
import { useAuth } from '../../../../context/AuthContext/AuthProvider.tsx';
import { useLocalization } from '../../../../context/LocaleContext/LocalizationProvider.tsx';
import { useNotification } from '../../../../context/NotificationContext/NotificationProvider.tsx';

// Custom components;
import Button from '../../../../ui/Button/Button.tsx';
import HorizontalLayout from '../../../../ui/Layout/HorizontalLayout/HorizontalLayout.tsx';
import VerticalLayout from '../../../../ui/Layout/VerticalLayout/VerticalLayout.tsx';

// Custom API;
import { upgradeDevice } from '../../../../api/api.upgrade-device.js';
import { getClaim } from '../../../../api/api.claim.js';

// Icons;
import IconCoin from '../../../../icons/IconCoin.tsx';
import IconLevel from '../../../../icons/IconLevel.tsx';
import IconParameter from '../../../../icons/IconParameter.tsx';

// Included styles;
import './CellDevice.scss';
import { boolean } from '@telegram-apps/sdk';

interface ComponentProps {
  deviceId: string;
  title: string;
  description: string;
  level: number;
  parameter: string;
  price: number;
}

const CellDevice = ({ deviceId, title, description, level, parameter, price }: ComponentProps): JSX.Element => {
  const { webApp, token, contextData, updateContextData } = useAuth();
  const { localization } = useLocalization();
  const { showNotification } = useNotification();

  const iconSize: number = 3;
  const balance: number = contextData.appData.balance;
  const upgradePrice: string = price.toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
  const upgradeAvailable = balance >= price;

  const successUpgradeNotification = () => {
    showNotification('success', localization.notifications.success, `${title} ${localization.notifications.upgrades.upgraded}`)
  }
  const errorUpgradeNotification = () => {
    showNotification('error', localization.notifications.error, `${title} ${localization.notification.upgrades.not_upgraded}`)
  }

  const upgrade = () => {
		upgradeDevice(token, webApp, deviceId).then(responseData => {
			getClaim(token, webApp).then(responseData => {
        updateContextData({ metaData: responseData.metaData, appData: responseData.appData })
        successUpgradeNotification()
      }).catch(error => {
        errorUpgradeNotification()
      })
		}).catch(error => {
			errorUpgradeNotification()
		})
  }

  const confirmUpgrade = () => {
    const formattedPrice = price.toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 })
    webApp.showConfirm(
      `Upgrade ${title} for ${formattedPrice} $tINCH?`, 
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
          <IconLevel size={ iconSize } />
          <p className="device-attribute__text">{ level } { localization.upgrades.device.level }</p>
        </div>
        <div className="device-attribute" id="parameter">
          <IconParameter size={ iconSize } />
          <p className="device-attribute__text">{ parameter }</p>
        </div>
        <div className={`device-attribute available-${upgradeAvailable}`} id="price">
          <IconCoin size={ iconSize } />
          <p className="device-attribute__text">${ upgradePrice }</p>
        </div>
      </VerticalLayout>
      <div className="device__button-container">
        <Button 
            disabled={price > balance ? true : false} 
            mode="gray" 
            size="medium" 
            haptic={["impact", "soft"]} 
            style={ {marginTop: '8px', padding: '12px', fontSize: '2.2vh', flexGrow: 1} }
            onClick={ confirmUpgrade }
          >
            { localization.upgrades.device.upgrade }
        </Button>
      </div>
    </div>
  );
};

export default CellDevice;
