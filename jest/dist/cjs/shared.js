"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PARAM_KEY = exports.PANEL_ID = exports.ADD_TESTS = exports.ADDON_ID = void 0;
exports.defineJestParameter = defineJestParameter;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

// addons, panels and events get unique names using a prefix
var PARAM_KEY = 'test';
exports.PARAM_KEY = PARAM_KEY;
var ADDON_ID = 'storybookjs/test';
exports.ADDON_ID = ADDON_ID;
var PANEL_ID = "".concat(ADDON_ID, "/panel");
exports.PANEL_ID = PANEL_ID;
var ADD_TESTS = "".concat(ADDON_ID, "/add_tests");
exports.ADD_TESTS = ADD_TESTS;

function defineJestParameter(parameters) {
  var jest = parameters.jest,
      filePath = parameters.fileName;

  if (typeof jest === 'string') {
    return [jest];
  }

  if (jest && Array.isArray(jest)) {
    return jest;
  }

  if (jest === undefined && typeof filePath === 'string') {
    var fileName = filePath.split('/').pop().split('.')[0];
    return [fileName];
  }

  return null;
}