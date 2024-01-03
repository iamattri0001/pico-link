export const isValidUrl = (url) => {
  const urlPattern = /^https?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/;
  return urlPattern.test(url);
};
