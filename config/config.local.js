'use strict';
const path = require('path');

module.exports = (appInfo, appConfig = {}) => {
  const assetsDir = (appConfig.assets && appConfig.assets.assetsDir) || 'app/web';
  const config = (exports = {});
  const port = 7000;

  config.logger = {
    level: 'NONE',
    consoleLevel: 'DEBUG',
  };

  config.assets = {
    publicPath: '/public',
    devServer: {
      command: 'umi dev',
      debug: true,
      port,
      env: {
        APP_ROOT: path.join(appInfo.baseDir, assetsDir),
        PORT: port,
        BROWSER: 'none',
        ESLINT: 'none',
        SOCKET_SERVER: `http://127.0.0.1:${port}`,
        PUBLIC_PATH: `http://127.0.0.1:${port}`,
      },
    },
    dynamicLocalIP: false,
  };
  
  config.httpProxy = {
    '/api/': {
      target: `http://127.0.0.1:${port}`,
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    }
  };
  return config;
};
