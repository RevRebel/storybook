"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.webpackFinal = webpackFinal;

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.object.assign.js");

function webpackFinal() {
  var _options$presetsList;

  var webpackConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 ? arguments[1] : undefined;
  var vueDocgenOptions = {};
  (_options$presetsList = options.presetsList) === null || _options$presetsList === void 0 ? void 0 : _options$presetsList.forEach(function (preset) {
    if (preset.name.includes('addon-docs') && preset.options.vueDocgenOptions) {
      var appendableOptions = preset.options.vueDocgenOptions;
      vueDocgenOptions = Object.assign({}, vueDocgenOptions, appendableOptions);
    }
  });
  webpackConfig.module.rules.push({
    test: /\.vue$/,
    loader: require.resolve('vue-docgen-loader', {
      paths: [require.resolve('@storybook/vue')]
    }),
    enforce: 'post',
    options: {
      docgenOptions: Object.assign({
        alias: webpackConfig.resolve.alias
      }, vueDocgenOptions)
    }
  });
  return webpackConfig;
}