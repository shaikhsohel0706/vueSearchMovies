/* eslint-disable no-undef */
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/MovieSearchVueJs/' : '/',
  };
  module.exports = {
    css: {
      loaderOptions: {
        sass: {
          implementation: require('sass'), // or require('node-sass') for node-sass
        },
      },
    },
  };
  