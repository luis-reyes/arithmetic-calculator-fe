module.exports = {
    // other configurations...
    devServer: {
      proxy: {
        '/api': {
          target: process.env.VUE_APP_API_BASE_URL,
          changeOrigin: true,
        },
      },
    },
  };
  