const withTM = require('next-transpile-modules')(['ui','utils']);
// const UnoCSS = require('@unocss/webpack').default;

module.exports = withTM({
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (isServer) {
      require('./utils/generate-sitemap');
    }
    // Important: return the modified config
    // config.plugins.push(UnoCSS({}));
    // if (buildId !== "development") {
    //   // * disable filesystem cache for build
    //   // * https://github.com/unocss/unocss/issues/419
    //   // * https://webpack.js.org/configuration/cache/
    //   config.cache = false;
    // }
    return config;
  },
});
