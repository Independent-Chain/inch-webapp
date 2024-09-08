import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useThemeParams } from "@zakarliuka/react-telegram-web-tools";

// Custom hooks;
import { useAuth } from '../context/AuthContext/AuthProvider.tsx';
import { useLocalization } from '../context/LocaleContext/LocalizationProvider.tsx';

// Custom helpers;
import { createUser } from '../api/api.create-user.js';
import { getUser } from '../api/api.get-user.js';

// Custom components;
import SplashScreen from '../components/SplashScreen/SplashScreen.tsx';
import DesktopSplashScreen from '../components/DesktopSplashScreen/DesktopSplashScreen.tsx';
import Loading from '../components/Loading/Loading.tsx';
import Header from '../modules/Header/Header.tsx'
import Home from '../pages/Home/Home.tsx';
import Upgrades from '../pages/Upgrades/Upgrades.tsx';
import Tasks from '../pages/Tasks/Tasks.tsx';
import Profile from '../pages/Profile/Profile.tsx';
import HonorBoard from '../pages/HonorBoard/HonorBoard.tsx';
import NavigationPanel from '../modules/NavigationPanel/NavigationPanel.tsx';

// Included styles;
import '../main.scss';

const App = (): JSX.Element => {
  const [loadingStatus, setLoadingStatus] = useState<Boolean>(true);
  
  const { setHeaderColor } = useThemeParams();
  const { token, webApp, updateContextData } = useAuth();
  const { updateLocalization } = useLocalization();
  
  setHeaderColor('rgb(14, 14, 14)');

  const [ debug, debugToken ] = webApp.initDataUnsafe.start_param.split('_')
  // @ts-ignore
  const debugMode = debug === 'debug' && debugToken == import.meta.env.VITE_DEBUG_PASSWORD;
  if (debugMode) {
    import('eruda').then(eruda => eruda.default.init());
  }

  useEffect(() => {
    if (token) {
      createUser(token, webApp).then(response => {
        updateContextData(response)
      }).catch(error => {
        getUser(token, webApp).then(response => {
          updateContextData(response)
          updateLocalization(response.appData.locale)
          setTimeout(() => {
            setLoadingStatus(false)
          }, debugMode ? 1 : 4000)
        }).catch(error => {
          throw error
        })
      })
    }
  }, [token])

  if (loadingStatus) {
    if (debugMode) {
      return <Loading text="Debugging loading" />
    } else {
      return <SplashScreen />
    }
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
  )
}

export default App;