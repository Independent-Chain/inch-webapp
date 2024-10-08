import React, { ReactNode, useEffect, useState } from 'react';

// Custom hooks;
import { useAuth } from '../../../../../../providers/AuthProvider.tsx';
import { useData } from '../../../../../../providers/DataProvider.tsx';
import { useLocalization } from '../../../../../../providers/LocalizationProvider.tsx';
import { useNotification } from '../../../../../../providers/NotificationProvider.tsx';

// Custom API;
import { API_TASKS_COMPLETE } from '../../../../../../api/api.tasks.complete.js';
import { API_USER_GET } from '../../../../../../api/api.user.get.js';

// Custom components;
import Button from '../../../../../../ui/Button/Button.tsx';

// Included styles;
import './SingleTask.scss';

type Icons = 'telegram';

interface ComponentProps {
  taskData: {
    task_id: number;
    status: boolean;
    icon: Icons;
    name: string;
    description: string;
    link: string;
    award: number;
  },
  completed: boolean;
}

const SingleTask = ({ taskData, completed }: ComponentProps): ReactNode => {
  const { localization } = useLocalization();
  const { webApp, token } = useAuth();
  const { updateDataContext } = useData();
  const { showNotification } = useNotification();

  const [completeStatus, setCompleteStatus] = useState(completed);
  const [buttonText, setButtonText] = useState(localization.tasks.buttons.start);

  useEffect(() => {
    setButtonText(localization.tasks.buttons.start);
  }, [localization]);

  const handleButtonClick = async () => {
    if (buttonText === localization.tasks.buttons.start) {
      if (taskData.icon === 'telegram') {
        webApp.openTelegramLink(taskData.link);
      } else {
        webApp.openLink(taskData.link);
      }
      setButtonText(localization.tasks.buttons.claim);
    } else if (buttonText === localization.tasks.buttons.claim) {
      await claimAward();
    }
  };

  const claimAward = async () => {
    try {
      const result = await API_TASKS_COMPLETE(token, webApp, taskData.task_id);
      if (result) {
        const newContextData = await API_USER_GET(token, webApp);
        updateDataContext(newContextData);
        setCompleteStatus(true);
        showNotification("success", localization.notifications.success, `${localization.tasks.c} ${taskData.award} tINCH`);
      }
    } catch (error) {
      console.error(error);
      showNotification("error", localization.notifications.error, localization.tasks.nc);
    }
  };

  return (
    <div className="task">
      <img className="task__icon" src={`/tasks-icons/${taskData.icon}.svg`} alt="task-icon" />
      <div className="task__body">
        <p className="task__name">
          {taskData.name}
          <span className={ completed ? "completed" : "not-completed" }>
            { completed ? localization.tasks.labels.c : localization.tasks.labels.nc }
          </span>
        </p>
        <p className="task__award">+{taskData.award} tINCH</p>
      </div>
      <Button
        disabled={ completeStatus }
        mode={ buttonText === localization.tasks.buttons.start ? "white" : "bezeled" }
        size="medium"
        haptic={["impact", "soft"]}
        style={{ margin: '0.3vh 0', padding: '0 6vw', fontSize: '2vh' }}
        onClick={() => !completed && handleButtonClick()}
      >
        { buttonText }
      </Button>
    </div>
  );
}

export default SingleTask;