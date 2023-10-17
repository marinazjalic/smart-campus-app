module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    /*
    plugins: [
      [
        '@svgr/babel-plugin-replace-jsx-attribute-value',
        {
          //"attributeNames": ["xlinkHref"],
          //"valuePattern": "USE_YOUR_PATTERN",
          //"replacePattern": "YOUR_REPLACEMENT"
        }
      ]
      
    ]
    */
  };
};

