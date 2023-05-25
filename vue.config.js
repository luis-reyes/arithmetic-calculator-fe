module.exports = {
    publicPath: '/arithmetic-calculator-fe',
    devServer: {
      proxy: {
        '/api': {
          target: process.env.VUE_APP_API_BASE_URL,
          changeOrigin: true,
        },
      },
    },
  };
  