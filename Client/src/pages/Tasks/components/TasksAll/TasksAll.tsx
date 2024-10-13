import { ReactNode, useEffect, useState } from 'react';

// Custom hooks;
import { useData } from '@providers/DataProvider.tsx';

// Custom components;
import Task from '@p-tasks/components/Task/Task.tsx';

// Included styles;
import './TasksAll.scss';


interface ComponentProps { }

const TasksAll = ({ }: ComponentProps): ReactNode => {
   const [notCompletedTasks, setNotCompletedTasks] = useState<any[]>([ ]);
   const [completedTasks, setCompletedTasks] = useState<any[]>([ ]);

   const { data } = useData();
  
   useEffect(() => {
      if (data.tasks) {
         type Task = any;
         type TaskData = any;

         const tasksArray = Object.values(data.tasks) as Task[];
         const tasksDataArray = Object.values(data.tasksData) as TaskData[];

         const completedTaskIds = new Set(tasksDataArray.map((task) => task.task_id));

         const completed = tasksArray.filter((task) => completedTaskIds.has(task.task_id));
         const notCompleted = tasksArray.filter((task) => !completedTaskIds.has(task.task_id));

         setCompletedTasks(completed);
         setNotCompletedTasks(notCompleted);
      }
   }, [data.tasksData]);

   return (
      <>
         {
            notCompletedTasks.map((task) => (
               <Task key={ task.task_id } taskData={ task } completed={ false } />
            ))
         }
         {
            completedTasks.map((task) => (
               <Task key={ task.task_id } taskData={ task } completed={ true } />
            ))
         }
      </>
   );
};

export default TasksAll;