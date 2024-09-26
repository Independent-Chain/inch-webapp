import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useThemeParams } from "@zakarliuka/react-telegram-web-tools";

// Custom hooks;
import { useAuth } from '../context/AuthContext/AuthProvider.tsx';
import { useLocalization } from '../context/LocaleContext/LocalizationProvider.tsx';

// Custom API;
import { API_USER_CREATE } from '../api/api.user.create.js';
import { API_USER_GET } from '../api/api.user.get.js';

// Custom helpers;
import { configAppMode } from './helpers/configAppMode.js';

// Custom components;
import SplashScreen from '../components/SplashScreen/SplashScreen.tsx';
import DesktopSplashScreen from '../components/DesktopSplashScreen/DesktopSplashScreen.tsx';
import StepByStep from '../modules/StepByStep/StepByStep.tsx';
import Loading from '../components/Loading/Loading.tsx';
import Header from '../modules/Header/Header.tsx';
import Home from '../pages/Home/Home.tsx';
import Upgrades from '../pages/Upgrades/Upgrades.tsx';
import Tasks from '../pages/Tasks/Tasks.tsx';
import Profile from '../pages/Profile/Profile.tsx';
import HonorBoard from '../pages/HonorBoard/HonorBoard.tsx';
import NavigationPanel from '../modules/NavigationPanel/NavigationPanel.tsx';

// Included styles;
import '../main.scss';

const App = (): JSX.Element => {
  const [loadingStatus, setLoadingStatus] = useState<boolean>(true);
  const [newUser, setNewUser] = useState<boolean>(false);

  const [device, setDevice] = useState<string>('');
  const [debug, setDebug] = useState<boolean>(false)
  
  const { setHeaderColor } = useThemeParams();
  const { token, webApp, updateContextData } = useAuth();
  const { updateLocalization } = useLocalization();

  // @ts-ignore
  setHeaderColor('rgb(14, 14, 14)');
  webApp.expand();

  const initializeUser = async () => {
    try {
      const response = await API_USER_CREATE(token, webApp);
      setNewUser(true);
      updateContextData(response);
    } catch (error) {
      try {
        const response = await API_USER_GET(token, webApp);
        updateContextData(response);
        updateLocalization(response.appData.locale);
        setTimeout(() => {
          setLoadingStatus(device !== 'desktop' ? false : true);
        }, debug ? 1 : 4000);
      } catch (error) {
        console.error(error);
      }
    }
  }

  useEffect(() => {
    configAppMode(debug, setDebug, setDevice);

    if (token) {
      initializeUser();
    }
  }, [token, debug, device]);

  const renderSplashScreen = () => {
    if (debug) {
      return <Loading text="Debugging loading" />;
    }
    if (!debug && device === 'desktop') {
      return <DesktopSplashScreen />;
    }
    return newUser ? <StepByStep loading={ setLoadingStatus} /> : <SplashScreen />;
  };

  if (loadingStatus) {
    return renderSplashScreen();
  }

  return (
    <BrowserRouter>
      <Header /> 
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route path='/upgrades' element={<Upgrades />} />
        <Route path='/tasks' element={<Tasks />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/honor-roll' element={<HonorBoard />} />
      </Routes>
      <NavigationPanel />
    </BrowserRouter>
  );
};

export default App;
