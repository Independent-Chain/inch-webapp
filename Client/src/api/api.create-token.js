import axios from 'axios';
import apiConfig from './api.config.js';

export const createToken = async (userId) => {
	const options = {
		method: 'POST',
		url: `${apiConfig.API_DOMAIN}/auth/token`,
		headers: {'Content-Type': 'application/json'},
		data: { userId }
	};
	try {
    const response = await axios.request(options);
    return response.data.access_token;
  } catch (error) {
		throw error
  }
}