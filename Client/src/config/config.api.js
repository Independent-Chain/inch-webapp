const mode = import.meta.env.VITE_LAUNCH_MODE;

const configure = (mode) => {
   if (mode === 'BUILD') {
      return { API_DOMAIN: import.meta.env.VITE_BUILD_DOMAIN }
   } else if (mode === 'DEVELOP') {
      return { API_DOMAIN: import.meta.env.VITE_DEVELOP_DOMAIN }
   }
}

const API_CONFIG = configure(mode);

export default API_CONFIG;