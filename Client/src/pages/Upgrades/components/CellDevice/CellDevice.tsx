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

interface ComponentProps {
  deviceId: string;
  headline: string;
  description: string;
  level: number;
  attribute: string;
  price: number;
}

const CellDevice = ({ deviceId, headline, description, level, attribute, price }: ComponentProps): JSX.Element => {
  const { webApp, token, contextData, updateContextData } = useAuth();
  const { localization } = useLocalization();
  const { showNotification } = useNotification();

  const iconSize: number = 3;
  const balance: number = contextData.appData.balance;
  const upgradePrice: string = price.toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 });

  const successUpgradeNotification = () => {
    showNotification('success', localization.notifications.success, `${headline} ${localization.notifications.upgrades.upgraded}`)
  }
  const errorUpgradeNotification = () => {
    showNotification('error', localization.notifications.error, `${headline} ${localization.notification.upgrades.not_upgraded}`)
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

  return (
    <div className="cell-device">
      <VerticalLayout justify="center" align="start">
        <p className="cell-device__title">{ headline[0].toUpperCase() + headline.slice(1) }</p>
        <p className="cell-device__description">{ description }</p>
      </VerticalLayout>
      <HorizontalLayout justify="start" align="center" gap={ 24 }>
        <div className="parameter">
          <IconLevel size={ iconSize } />
          <p className="cell-device__description">{ level } { localization.upgrades.device.level }</p>
        </div>
        <div className="parameter">
          <IconParameter size={ iconSize } />
          <p className="cell-device__description">{ attribute }</p>
        </div>
        <div className="parameter">
          <IconCoin size={ iconSize } />
          <p className="cell-device__description">${ upgradePrice }</p>
        </div>
      </HorizontalLayout>
      <Button 
        disabled={price > balance ? true : false} 
        mode="white" 
        size="medium" 
        haptic={["impact", "soft"]} 
        style={ {marginTop: "6px", fontSize: "15px"} }
        onClick={ () => upgrade() }
      >
        { localization.upgrades.device.upgrade }
      </Button>
    </div>
  );
};

export default CellDevice;
