import axios from 'axios';
import API_CONFIG from './api.config.js';

export const API_USER_LOCALE = async (token, webApp, appData) => {
	const userId = webApp.initDataUnsafe.user.id
	const options = {
		method: 'GET',
		url: `${API_CONFIG.API_DOMAIN}/user/locale/${userId}`,
		params: {locale: appData.locale},
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