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
  const [splashScreen, setSplashScreen] = useState<Boolean>(true)
  const { setHeaderColor } = useThemeParams()
  const { token, webApp, updateContextData } = useAuth()
  const { updateLocalization } = useLocalization()
  
  // @ts-ignore
  setHeaderColor('rgb(14, 14, 14)')

  const hideSplashScreen = () => {
    setTimeout(() => {
      setSplashScreen(false)
    }, 4000)
  }

  useEffect(() => {
    if (token) {
      createUser(token, webApp).then(response => {
        updateContextData(response)
      }).catch(error => {
        getUser(token, webApp).then(response => {
          updateContextData(response)
          updateLocalization(response.appData.locale)
          hideSplashScreen()
        }).catch(error => {
          throw error
        })
      })
    }
  }, [token])

  if (splashScreen) {
    return <SplashScreen />
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