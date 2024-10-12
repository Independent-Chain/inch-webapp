import { ReactNode, useEffect, useState } from 'react';

// Custom hooks;
import { useAuth } from '@providers/AuthProvider.tsx';
import { useData } from '@providers/DataProvider.tsx';
import { useLocalization } from '@providers/LocalizationProvider.tsx'; 

// Custom components;
import TasksAll from '@p-tasks/components/TasksAll/TasksAll.tsx';
import Loading from '@ui/Loading/Loading.tsx';

// Custom API;
import { API_TASKS_ALL } from '@API/api.tasks.all.ts';

// Included styles;
import './Tasks.scss';
import '@pages/page.scss';


interface ComponentProps { }

const Tasks = ({ }: ComponentProps): ReactNode => {
   const [loadingStatus, setLoadingStatus] = useState<boolean>(true);

   const { webApp, token } = useAuth();
   const { contextData } = useData();
   const { localization } = useLocalization();

   useEffect(() => {
      loadTasks();
   }, [token]);

   const loadTasks = async () => {
      try {
         const response = await API_TASKS_ALL(token, webApp);
         contextData.tasks = response;
      } catch(error) {
         console.log(error);
      } finally {
         setLoadingStatus(false);
      }
   }

   if (loadingStatus) {
      return <Loading />
   }

   return (
      <div className="page" id="tasks">
         <TasksAll />
         <p className="tasks__information">
            { localization.tasks.description }<a href="https://t.me/inch_support" style={{color: 'var(--accent-1000'}}>@inch_support</a>
         </p>
      </div>
   )
}

export default Tasks;