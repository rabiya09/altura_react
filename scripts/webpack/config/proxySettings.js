module.exports = (envUrl) => {
  const defaultSettings = {
    target: envUrl,
    changeOrigin: true,
    secure: false,
  };

  return {
    '/sitecore/**': {
      ...defaultSettings,
    },
    '/-/{media,jssmedia}/**': {
      ...defaultSettings,
    },
    '/api/**': {
      ...defaultSettings,
    },
    '/gehc_api/**': {
      ...defaultSettings,
    },
  };
};
