import axios from 'axios';
import apiConfig from './api.config.js';

export const getClaim = async (token, webApp) => {
	const userId = webApp.initDataUnsafe.user.id
	const options = {
		method: 'GET',
		url: `${apiConfig.API_DOMAIN}/mining/claim/${userId}`,
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