import axios from 'axios';
import API_CONFIG from '../config/config.api.js';

export const API_RATING_HOLDERS = async (token, webApp) => {
	const userId = webApp.initDataUnsafe.user.id
	const options = {
		method: 'GET',
		url: `${API_CONFIG.API_DOMAIN}/rating/holders/${userId}`,
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