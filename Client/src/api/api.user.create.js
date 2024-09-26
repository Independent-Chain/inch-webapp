import axios from 'axios';
import API_CONFIG from './api.config.js';

export const API_USER_CREATE = async (token, webApp) => {
	const options = {
		method: 'POST',
		url: `${API_CONFIG.API_DOMAIN}/user/create`,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		data: { 
			metaData: {
				user_id: webApp.initDataUnsafe.user.id,
    		first_name: webApp.initDataUnsafe.user.first_name,
				last_name: webApp.initDataUnsafe.user.last_name,
				username: webApp.initDataUnsafe.user.username,
				language_code: webApp.initDataUnsafe.user.language_code,
				is_premium: webApp.initDataUnsafe.user.is_premium,
				allows_write_to_pm: webApp.initDataUnsafe.user.allows_write_to_pm,
				photo_url: webApp.initDataUnsafe.user.photo_url
			},
			start_param: webApp.initDataUnsafe.start_param
		}
	};
	try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
		throw error
  }
}