import { ReactNode, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Custom hooks;
import { useAuth } from '@providers/AuthProvider.tsx';
import { useData } from '@providers/DataProvider.tsx';
import { useLocalization } from '@providers/LocalizationProvider.tsx';

// Custom API;
import { API_USER_CREATE } from '@API/api.user.create.ts';
import { API_USER_GET } from '@API/api.user.get.ts';
import { API_DAILY_CHECK } from '@API/api.daily.check.ts';

// Custom helpers;
import { configureLaunch } from '@config/config.launch.ts';

// Pages;
import Home from '@p-home/Home.tsx';
import Upgrades from '@p-upgrades/Upgrades.tsx';
import Tasks from '@p-tasks/Tasks.tsx';
import Profile from '@p-profile/Profile.tsx';
import Leaderboard from '@p-leaderboard/Leaderboard.tsx';
import HonorBoard from '@p-honorboard/HonorBoard.tsx';

// Custom components;
import MobileSplashScreen from '@ui/SplashScreen/MobileSplashScreen/MobileSplashScreen.tsx';
import DesktopSplashScreen from '@ui/SplashScreen/DesktopSplashScreen/DesktopSplashScreen.tsx';
import Loading from '@ui/Loading/Loading.tsx';
import DailyReward from '@modules/DailyReward/DailyReward.tsx';
import Header from '@modules/Header/Header.tsx';
import NavigationPanel from '@modules/NavigationPanel/NavigationPanel.tsx';

// Included styles;
import '@/main.scss';

const App = (): ReactNode => {
  const [loadingStatus, setLoadingStatus] = useState<boolean>(true);
  const [dailyRewardData, setDailyRewardData] = useState(null);
  const [device, setDevice] = useState<string>('');
  const [debug, setDebug] = useState<boolean>(false)
  
  const { token, webApp } = useAuth();
  const { updateDataContext } = useData();
  const { updateLocalization } = useLocalization();

  webApp.setHeaderColor('#0e0e0e')
  webApp.expand();

  useEffect(() => {
    configureLaunch(debug, setDebug, setDevice);
    if (token) handleUserCreation();
  }, [token, debug, device]);

  const stopLoading = async () => {
    setTimeout(() => {
      setLoadingStatus(device !== 'desktop' ? false : true);
    }, debug ? 1 : 4000)
  }

  const handleUserCreation = async () => {
    try {
      const response = await API_USER_CREATE(token, webApp);
      updateDataContext(response);
      await stopLoading();
      await fetchDailyReward();
    } catch (error) {
      console.log(error)
      await handleExistingUser();
    }
  };

  const handleExistingUser = async () => {
    try {
      const response = await API_USER_GET(token, webApp);
      updateDataContext(response);
      updateLocalization(response.appData.locale);
      await stopLoading();
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
    return device === 'desktop' ? <DesktopSplashScreen /> : <MobileSplashScreen />;
  };

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
        <Route path='/leaderboard' element={<Leaderboard />} />
        <Route path='/honor-roll' element={<HonorBoard />} />
      </Routes>
      <NavigationPanel />
    </BrowserRouter>
  );
};

export default App;
