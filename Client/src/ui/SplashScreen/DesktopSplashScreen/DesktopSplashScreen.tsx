import { ReactNode } from 'react';

// Included styles;
import './DesktopSplashScreen.scss';

interface ComponentProps {}

const DesktopSplashScreen = ({}: ComponentProps): ReactNode => {
   return (
      <div className="desktop-splash">
         <p className="desktop-splash__title">Open Independent Chain mini App on mobile for better experience</p>
         <div className="qr-container">
            <img src="/qrCode.svg" alt="qrCode" className="qr-code" />
         </div>
         <p className="desktop-splash__description">San QR code to check Independent Chain channel</p>
         <a href="https://t.me/inch_support" className="desktop-splash__support">Support: <span className="accent">@inch_support</span></a>
      </div>
   )
}

export default DesktopSplashScreen;