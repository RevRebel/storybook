"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withTests = void 0;

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.object.values.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.regexp.constructor.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.array.find.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.match.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.object.assign.js");

var _addons = require("@storybook/addons");

var _upath = require("upath");

var _shared = require("./shared");

var findTestResults = function findTestResults(testFiles, jestTestResults, jestTestFilesExt) {
  return Object.values(testFiles).map(function (name) {
    var fileName = "".concat(_upath.sep).concat(name).concat(jestTestFilesExt);

    if (jestTestResults && jestTestResults.testResults) {
      var fileNamePattern = new RegExp(fileName);
      return {
        fileName: fileName,
        name: name,
        result: jestTestResults.testResults.find(function (test) {
          return Boolean((0, _upath.normalize)(test.name).match(fileNamePattern));
        })
      };
    }

    return {
      fileName: fileName,
      name: name
    };
  });
};

var emitAddTests = function emitAddTests(_ref) {
  var kind = _ref.kind,
      story = _ref.story,
      testFiles = _ref.testFiles,
      options = _ref.options;

  _addons.addons.getChannel().emit(_shared.ADD_TESTS, {
    kind: kind,
    storyName: story,
    tests: findTestResults(testFiles, options.results, options.filesExt)
  });
};

var withTests = function withTests(userOptions) {
  var defaultOptions = {
    filesExt: '((\\.specs?)|(\\.tests?))?(\\.[jt]sx?)?$'
  };
  var options = Object.assign({}, defaultOptions, userOptions);
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var storyFn = args[0],
        _args$ = args[1],
        kind = _args$.kind,
        _args$$parameters = _args$.parameters,
        parameters = _args$$parameters === void 0 ? {} : _args$$parameters;
    var testFiles = (0, _shared.defineJestParameter)(parameters);

    if (testFiles !== null) {
      emitAddTests({
        kind: kind,
        story: storyFn,
        testFiles: testFiles,
        options: options
      });
    }

    return storyFn();
  };
};

exports.withTests = withTests;

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}