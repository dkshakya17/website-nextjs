module.exports = {
    exportPathMap: function() {
      return {
        '/': { page: '/' }
      };
    }
  };

const withCSS = require('@zeit/next-css')
module.exports = withCSS({
  cssLoaderOptions: {
    url: false
  }
})