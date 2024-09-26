import axios from 'axios';
import apiConfig from './api.config.js';

export const API_TASKS_ALL = async (token, webApp) => {
	const userId = webApp.initDataUnsafe.user.id;
	const options = {
		method: 'GET',
		url: `${apiConfig.API_DOMAIN}/tasks/all/${userId}`,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		}
	};
	try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
		throw error
  }
}