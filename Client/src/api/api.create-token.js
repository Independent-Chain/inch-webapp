import axios from 'axios';
import apiConfig from './api.config.js';

export const getToken = async (userId, initData) => {
	const options = {
		method: 'POST',
		url: `${apiConfig.API_DOMAIN}/auth/token`,
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