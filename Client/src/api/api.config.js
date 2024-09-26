// Develop: http://localhost:3000/api
// Production: https://inch-app.ru/api

const configApi = (mode = 'dev') => {
	if (mode === 'build') {
		return { API_DOMAIN: 'https://inch-app.ru/api' }
	} else if (mode === 'dev') {
		return { API_DOMAIN: 'http://localhost:3000/api' }
	}
}

const apiConfig = configApi()

export default apiConfig;