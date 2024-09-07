import React, { ReactNode, createContext, useContext, useState } from 'react';

// Custom API;
import { createToken } from '../../api/api.create-token.js';

interface AuthContextType {
	webApp: { [key: string]: any };
	token: string | null;
	contextData: { [key: string]: any };
	updateContextData: (newData: any) => void;
}
interface ContextDataType {
	metaData?: object;
	appData?: object;
}
interface ComponentProps {
	children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: ComponentProps): JSX.Element => {
	// @ts-ignore
	const webApp = window.Telegram.WebApp
	const userId = webApp.initDataUnsafe.user.id

	const [token, setToken] = useState<string>('')
	const [contextData, setContextData] = useState<ContextDataType>({})

	createToken(userId).then(response => {
		setToken(response)
	}).catch(error => {
		throw error
	})

	const updateContextData = (newData: any) => {
		setContextData(prevContext => ({
			metaData: { ...prevContext.metaData, ...newData.metaData },
			appData: { ...prevContext.appData, ...newData.appData }
		}));
	}

	return (
		<AuthContext.Provider value={{ webApp, token, contextData, updateContextData }}>
			{children}
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