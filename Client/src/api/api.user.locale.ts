import axios from 'axios';
import API_CONFIG from '@config/config.api.ts';

// Custom types;
import { WebAppType } from '@providers/AuthProvider.tsx';

export const API_USER_LOCALE = async (token: string, webApp: WebAppType, locale: string) => {
   const userId = webApp.initDataUnsafe.user.id
   const options = {
      method: 'GET',
      url: `${API_CONFIG.API_DOMAIN}/user/locale/${userId}`,
      params: {locale: locale},
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