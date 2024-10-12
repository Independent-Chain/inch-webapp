import axios from 'axios';
import API_CONFIG from '@config/config.api.ts';

// Custom types;
import { WebAppType } from '@providers/AuthProvider.tsx';

export const API_TASKS_COMPLETE = async (token: string, webApp: WebAppType, task_id: number) => {
   const options = {
      method: 'POST',
      url: `${API_CONFIG.API_DOMAIN}/tasks/complete`,
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
      },
      data: { 
         user_id: webApp.initDataUnsafe.user.id,
         task_id: task_id,
      }
   };
   try {
      const response = await axios.request(options);
      return response.data;
   } catch (error) {
      throw error
   }
}