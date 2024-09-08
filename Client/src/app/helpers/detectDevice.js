export const detectDevice = () => {
  const userAgent = navigator.userAgent;

  if (/mobile/i.test(userAgent)) {
      return 'mobile';
  } else {
      return 'desktop';
  }
}