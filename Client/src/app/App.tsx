import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Custom hooks;
import { useAuth } from '../context/AuthContext/AuthProvider.tsx';
import { useLocalization } from '../context/LocaleContext/LocalizationProvider.tsx';

// Custom API;
import { API_USER_CREATE } from '../api/api.user.create.js';
import { API_USER_GET } from '../api/api.user.get.js';
import { API_DAILY_CHECK } from '../api/api.daily.check.js';

// Custom helpers;
import { configureLaunch } from '../config/config.launch.js';

// Custom components;
import SplashScreen from '../components/SplashScreen/SplashScreen.tsx';
import DesktopSplashScreen from '../components/DesktopSplashScreen/DesktopSplashScreen.tsx';
import StepByStep from '../modules/StepByStep/StepByStep.tsx';
import Loading from '../components/Loading/Loading.tsx';
import DailyReward from '../modules/DailyReward/DailyReward.tsx';
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
  const [dailyRewardData, setDailyRewardData] = useState(null);

  const [device, setDevice] = useState<string>('');
  const [debug, setDebug] = useState<boolean>(false)
  
  const { token, webApp, updateContextData } = useAuth();
  const { updateLocalization } = useLocalization();

  webApp.setHeaderColor('#0e0e0e')
  webApp.expand();

  const handleUserCreation = async () => {
    try {
      const response = await API_USER_CREATE(token, webApp);
      setNewUser(true);
      updateContextData(response);
    } catch (error) {
      await handleExistingUser();
    }
  };

  const handleExistingUser = async () => {
    try {
      const response = await API_USER_GET(token, webApp);
      updateContextData(response);
      updateLocalization(response.appData.locale);
      setTimeout(() => {
        setLoadingStatus(device !== 'desktop' ? false : true);
      }, debug ? 1 : 4000)
      await fetchDailyReward();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDailyReward = async () => {
    try {
      const response = await API_DAILY_CHECK(token, webApp);
      setDailyRewardData(response);
    } catch (error) {
      console.error(error);
    }
  };

  const renderSplashScreen = () => {
    if (debug) return <Loading text="Debugging loading" />;
    return device === 'desktop' ? <DesktopSplashScreen /> : (newUser ? <StepByStep loading={setLoadingStatus} /> : <SplashScreen />);
  };

  useEffect(() => {
    configureLaunch(debug, setDebug, setDevice);
    if (token) handleUserCreation();
  }, [token, debug, device]);

  if (loadingStatus) return renderSplashScreen();

  return (
    <BrowserRouter>
      { dailyRewardData && <DailyReward dailyInformation={ dailyRewardData } stateController={ setDailyRewardData } /> }
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
