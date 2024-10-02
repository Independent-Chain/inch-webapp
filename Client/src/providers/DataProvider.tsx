import React, { ReactNode, createContext, useContext, useState } from 'react';

interface ContextType {
	contextData: { [key: string]: any };
	updateDataContext: (newData: any) => void;
}

interface ContextDataType {
	metaData?: object;
	appData?: object;
	tasksData?: object;
}

interface ComponentProps {
	children: ReactNode;
}

export const DataContext = createContext<ContextType | null>(null)

export const DataProvider = ({ children }: ComponentProps): ReactNode => {
	const [contextData, setContextData] = useState<ContextDataType>({})

	const updateDataContext = (newData: { [key: string]: any }) => {
		setContextData(prevContext => ({
			...prevContext,
			metaData: { ...prevContext.metaData, ...newData.metaData },
			appData: { ...prevContext.appData, ...newData.appData },
			tasksData: { ...prevContext.tasksData, ...newData.tasksData }
		}));
	}

	return (
		<DataContext.Provider value={{ contextData, updateDataContext }}>
			{ children }
		</DataContext.Provider>
	)
}

export const useData = (): ContextType => {
	const context = useContext(DataContext);
	if (!context) {
		throw new Error('useData must be used within an AuthProvider')
	}
	return context;
}