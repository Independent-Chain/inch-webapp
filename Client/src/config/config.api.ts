type ApiConfigType = {
	API_DOMAIN: string
}

const mode = import.meta.env.VITE_LAUNCH_MODE;

const configure = (mode: string) => {
	if (mode === 'BUILD') {
		return { API_DOMAIN: import.meta.env.VITE_BUILD_DOMAIN };
	} else if (mode === 'DEVELOP') {
		return { API_DOMAIN: import.meta.env.VITE_DEVELOP_DOMAIN };
	}
	return { API_DOMAIN: 'IncorrectLaunchMode' };
}

const API_CONFIG: ApiConfigType = configure(mode);

export default API_CONFIG;