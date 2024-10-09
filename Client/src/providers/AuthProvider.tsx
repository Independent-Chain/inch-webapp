import { ReactNode, createContext, useContext, useState } from 'react';
import { retrieveLaunchParams } from '@telegram-apps/sdk';

// Custom API;
import { API_AUTH_TOKEN } from '../api/api.auth.token.js';

export type WebAppType = {
	[key: string]: any
} 

interface AuthContextType {
	webApp: WebAppType;
	token: string;
}

interface ComponentProps {
	children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: ComponentProps): ReactNode => {
	// @ts-ignore
	const webApp = window.Telegram.WebApp;
	const userId = webApp.initDataUnsafe.user.id;
	const { initDataRaw } = retrieveLaunchParams();

	const [token, setToken] = useState<string>('')

	API_AUTH_TOKEN(userId, initDataRaw).then(response => {
		setToken(response)
	}).catch(error => {
		throw error
	})

	return (
		<AuthContext.Provider value={{ webApp, token }}>
			{ children }
		</AuthContext.Provider>
	)
}

/* 
useAuth hook must be used within AuthProvider!
Example of use useAuth hook:
const { webApp, token, contextData, updateContextData } = useAuth();
*/
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};