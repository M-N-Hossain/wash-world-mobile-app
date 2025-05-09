import 'dotenv/config';

// This app.config.js file is used only for the maps API key

export default ({ config }) => {
  return {
    ...config,
    ios: {
      ...config.ios,
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY
        }
      }
    },
    android: {
      ...config.android,
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY
        }
      }
    }
  };
};
