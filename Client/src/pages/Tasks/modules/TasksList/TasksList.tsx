import { ReactNode, useEffect, useState } from 'react';

// Custom hooks;
import { useData } from '@providers/DataProvider.tsx';

// Custom components;
import SingleTask from './components/SingleTask/SingleTask.tsx';

// Included styles;
import './TasksList.scss';

interface ComponentProps {
  
}

const TasksList = ({}: ComponentProps): ReactNode => {
	const [notCompletedTasks, setNotCompletedTasks] = useState<any[]>([ ]);
  const [completedTasks, setCompletedTasks] = useState<any[]>([ ]);

	const { contextData } = useData();
  
	useEffect(() => {
    if (contextData.tasks) {
      type Task = any;
      type TaskData = any;

      const tasksArray = Object.values(contextData.tasks) as Task[];
      const tasksDataArray = Object.values(contextData.tasksData) as TaskData[];

      const completedTaskIds = new Set(tasksDataArray.map((task) => task.task_id));

      const completed = tasksArray.filter((task) => completedTaskIds.has(task.task_id));
      const notCompleted = tasksArray.filter((task) => !completedTaskIds.has(task.task_id));

      setCompletedTasks(completed);
      setNotCompletedTasks(notCompleted);
    }
  }, [contextData.tasksData]);

  return (
    <>
      {notCompletedTasks.map((task) => (
        <SingleTask key={ task.task_id } taskData={ task } completed={ false } />
      ))}
      {completedTasks.map((task) => (
        <SingleTask key={ task.task_id } taskData={ task } completed={ true } />
      ))}
    </>
  );
};

export default TasksList;