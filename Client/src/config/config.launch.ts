export const configureLaunch = (debug: boolean, setDebug: Function, setDevice: Function) => {
   const detectDevice = () => {
      const userAgent = navigator.userAgent;
	
      if (/mobile/i.test(userAgent)) {
         return 'mobile';
      } else {
         return 'desktop';
      }
   }
	
   if (import.meta.env.VITE_LAUNCH_MODE === 'DEVELOP') {
      setDebug(true)
   }

   if (debug) {
      setDevice('mobile')
      import('eruda').then(eruda => eruda.default.init());
   } else {
      setDevice(detectDevice());
   }
}