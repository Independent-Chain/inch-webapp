import axios from 'axios';
import apiConfig from './api.config.js';

export const completeTask = async (token, webApp, task_id) => {
	const options = {
		method: 'POST',
		url: `${apiConfig.API_DOMAIN}/tasks/complete`,
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