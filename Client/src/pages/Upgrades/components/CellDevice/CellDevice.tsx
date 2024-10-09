import React, { ReactNode } from 'react';

// Custom hooks;
import { useAuth } from '../../../../providers/AuthProvider.tsx';
import { useData } from '../../../../providers/DataProvider.tsx';
import { useLocalization } from '../../../../providers/LocalizationProvider.tsx';
import { useNotification } from '../../../../providers/NotificationProvider.tsx';

// Custom components;
import Button from '../../../../ui/Button/Button.tsx';
import VerticalLayout from '../../../../ui/Layout/VerticalLayout/VerticalLayout.tsx';

// Custom API;
import { API_MINING_UPGRADE } from '../../../../api/api.mining.upgrade.js';
import { API_MINING_CLAIM } from '../../../../api/api.mining.claim.js';

// Icons;
import IconCoin from '../../../../icons/IconCoin.tsx';
import IconLevel from '../../../../icons/IconLevel.tsx';
import IconParameter from '../../../../icons/IconParameter.tsx';

// Included styles;
import './CellDevice.scss';

// Custom helpers;
import formatUpgradeConfirm from '../../helpers/formatUpgradeConfirm.ts';

interface ComponentProps {
  deviceId: string;
  title: string;
  description: string;
  level: number;
  parameter: string;
  price: number;
}

const CellDevice = ({ deviceId, title, description, level, parameter, price }: ComponentProps): ReactNode => {
  const { webApp, token } = useAuth();
  const { contextData, updateDataContext } = useData();
  const { localization } = useLocalization();
  const { showNotification } = useNotification();

  const iconSize: number = 12;
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
		API_MINING_UPGRADE(token, webApp, deviceId).then(responseData => {
			API_MINING_CLAIM(token, webApp).then(responseData => {
        updateDataContext({ metaData: responseData.metaData, appData: responseData.appData })
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

export default CellDevice;
