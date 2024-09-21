import axios from 'axios';
import apiConfig from './api.config.js';

export const getTasks = async (token) => {
	const options = {
		method: 'GET',
		url: `${apiConfig.API_DOMAIN}/tasks/all`,
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