import axios from 'axios';
import API_CONFIG from './api.config.js';

export const API_AUTH_TOKEN = async (userId, initData) => {
	const options = {
		method: 'POST',
		url: `${API_CONFIG.API_DOMAIN}/auth/token`,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `tma ${initData}`
		},
		data: { userId }
	}

	try {
    const response = await axios.request(options);
    return response.data.access_token;
  } catch (error) {
		throw error
  }
}