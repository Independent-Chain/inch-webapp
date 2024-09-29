import axios from 'axios';
import API_CONFIG from './api.config.js';

export const API_DAILY_CHECK = async (token, webApp) => {
	const userId = webApp.initDataUnsafe.user.id
	const options = {
		method: 'GET',
		url: `${API_CONFIG.API_DOMAIN}/daily/check/${userId}`,
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