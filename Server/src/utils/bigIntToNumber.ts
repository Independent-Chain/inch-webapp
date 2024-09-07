export const convertBigIntToNumber = (data) => {
  if (Array.isArray(data)) {
    return data.map(item => convertBigIntToNumber(item));
  } else if (data !== null && typeof data === 'object') {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => {
        if (typeof value === 'bigint') {
          return [key, Number(value)];
        }
        return [key, convertBigIntToNumber(value)];
      })
    );
  }
  return data;
}