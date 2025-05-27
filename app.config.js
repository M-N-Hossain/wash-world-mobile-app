import "dotenv/config";

// This app.config.js file is used only for the maps API key

export default ({ config }) => {
  return {
    ...config,
    extra: {
      API_URL: process.env.API_URL,
    },
    ios: {
      ...config.ios,
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY,
        },
      },
    },
    android: {
      ...config.android,
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY,
        },
      },
    },
  };
};
