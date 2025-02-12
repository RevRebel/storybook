"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.map.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.sort.js");

var _react = _interopRequireWildcard(require("react"));

var _theming = require("@storybook/theming");

var _components = require("@storybook/components");

var _reactSizeme = require("react-sizeme");

var _Result = _interopRequireDefault(require("./Result"));

var _provideJestResult = _interopRequireDefault(require("../hoc/provideJestResult"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var StatusTypes = {
  PASSED_TYPE: 'passed',
  FAILED_TYPE: 'failed',
  PENDING_TYPE: 'pending',
  TODO_TYPE: 'todo'
};

var List = _theming.styled.ul({
  listStyle: 'none',
  fontSize: 14,
  padding: 0,
  margin: 0
});

var Item = _theming.styled.li({
  display: 'block',
  padding: 0
});

var ProgressWrapper = _theming.styled.div({
  position: 'relative',
  height: 10,
  width: 30,
  display: 'flex',
  top: -2
});

var SuiteHead = _theming.styled.div({
  display: 'flex',
  alignItems: 'baseline',
  position: 'absolute',
  zIndex: 2,
  right: 20,
  marginTop: 15
});

var SuiteTotals = (0, _theming.styled)(function (_ref) {
  var result = _ref.result,
      className = _ref.className,
      width = _ref.width;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: className
  }, /*#__PURE__*/_react.default.createElement(_react.Fragment, null, width > 325 && result.assertionResults ? /*#__PURE__*/_react.default.createElement("div", null, result.assertionResults.length, " ", result.assertionResults.length > 1 ? "tests" : "test") : null, width > 280 && result.endTime && result.startTime ? /*#__PURE__*/_react.default.createElement("div", null, result.endTime - result.startTime, "ms") : null));
})(function (_ref2) {
  var theme = _ref2.theme;
  return {
    display: 'flex',
    alignItems: 'center',
    color: theme.color.dark,
    fontSize: '14px',
    marginTop: -5,
    '& > *': {
      marginRight: 10
    }
  };
});

var SuiteProgressPortion = _theming.styled.div(function (_ref3) {
  var theme = _ref3.theme,
      color = _ref3.color,
      progressPercent = _ref3.progressPercent;
  return {
    height: 6,
    top: 3,
    width: "".concat(progressPercent, "%"),
    backgroundColor: color
  };
});

var getTestsByTypeMap = function getTestsByTypeMap(result) {
  var testsByType = new Map();
  result.assertionResults.forEach(function (assertion) {
    testsByType.set(assertion.status, testsByType.get(assertion.status) ? testsByType.get(assertion.status).concat(assertion) : [assertion]);
  });
  return testsByType;
};

var getColorByType = function getColorByType(type) {
  // using switch to allow for new types to be added
  switch (type) {
    case StatusTypes.PASSED_TYPE:
      return (0, _theming.convert)(_theming.themes.normal).color.positive;

    case StatusTypes.FAILED_TYPE:
      return (0, _theming.convert)(_theming.themes.normal).color.negative;

    case StatusTypes.PENDING_TYPE:
      return (0, _theming.convert)(_theming.themes.normal).color.warning;

    case StatusTypes.TODO_TYPE:
      return (0, _theming.convert)(_theming.themes.normal).color.purple;

    default:
      return null;
  }
};

var Content = (0, _theming.styled)(function (_ref4) {
  var tests = _ref4.tests,
      className = _ref4.className;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: className
  }, tests.map(function (_ref5) {
    var name = _ref5.name,
        result = _ref5.result;

    if (!result || !result.assertionResults) {
      return /*#__PURE__*/_react.default.createElement(_components.Placeholder, {
        key: name
      }, "This story has tests configured, but no file was found");
    }

    var testsByType = getTestsByTypeMap(result);
    var entries = testsByType.entries();

    var sortedTestsByCount = _toConsumableArray(entries).sort(function (a, b) {
      return a[1].length - b[1].length;
    });

    return /*#__PURE__*/_react.default.createElement(_reactSizeme.SizeMe, {
      refreshMode: "debounce",
      key: name
    }, function (_ref6) {
      var size = _ref6.size;
      var width = size.width;
      return /*#__PURE__*/_react.default.createElement("section", null, /*#__PURE__*/_react.default.createElement(SuiteHead, null, /*#__PURE__*/_react.default.createElement(SuiteTotals, {
        result: result,
        width: width
      }), width > 240 ? /*#__PURE__*/_react.default.createElement(ProgressWrapper, null, sortedTestsByCount.map(function (entry) {
        return /*#__PURE__*/_react.default.createElement(SuiteProgressPortion, {
          key: "progress-portion-".concat(entry[0]),
          color: getColorByType(entry[0]),
          progressPercent: entry[1] ? entry[1].length / result.assertionResults.length * 100 : 0
        });
      })) : null), /*#__PURE__*/_react.default.createElement(_components.TabsState, {
        initial: "failing-tests",
        backgroundColor: (0, _theming.convert)(_theming.themes.normal).background.hoverable
      }, /*#__PURE__*/_react.default.createElement("div", {
        id: "failing-tests",
        title: "".concat(testsByType.get(StatusTypes.FAILED_TYPE) ? testsByType.get(StatusTypes.FAILED_TYPE).length : 0, " Failed"),
        color: getColorByType(StatusTypes.FAILED_TYPE)
      }, /*#__PURE__*/_react.default.createElement(List, null, testsByType.get(StatusTypes.FAILED_TYPE) ? testsByType.get(StatusTypes.FAILED_TYPE).map(function (res) {
        return /*#__PURE__*/_react.default.createElement(Item, {
          key: res.fullName || res.title
        }, /*#__PURE__*/_react.default.createElement(_Result.default, res));
      }) : /*#__PURE__*/_react.default.createElement(_components.Placeholder, {
        key: "no-tests-".concat(StatusTypes.FAILED_TYPE)
      }, "This story has no failing tests."))), /*#__PURE__*/_react.default.createElement("div", {
        id: "passing-tests",
        title: "".concat(testsByType.get(StatusTypes.PASSED_TYPE) ? testsByType.get(StatusTypes.PASSED_TYPE).length : 0, " Passed"),
        color: getColorByType(StatusTypes.PASSED_TYPE)
      }, /*#__PURE__*/_react.default.createElement(List, null, testsByType.get(StatusTypes.PASSED_TYPE) ? testsByType.get(StatusTypes.PASSED_TYPE).map(function (res) {
        return /*#__PURE__*/_react.default.createElement(Item, {
          key: res.fullName || res.title
        }, /*#__PURE__*/_react.default.createElement(_Result.default, res));
      }) : /*#__PURE__*/_react.default.createElement(_components.Placeholder, {
        key: "no-tests-".concat(StatusTypes.PASSED_TYPE)
      }, "This story has no passing tests."))), /*#__PURE__*/_react.default.createElement("div", {
        id: "pending-tests",
        title: "".concat(testsByType.get(StatusTypes.PENDING_TYPE) ? testsByType.get(StatusTypes.PENDING_TYPE).length : 0, " Pending"),
        color: getColorByType(StatusTypes.PENDING_TYPE)
      }, /*#__PURE__*/_react.default.createElement(List, null, testsByType.get(StatusTypes.PENDING_TYPE) ? testsByType.get(StatusTypes.PENDING_TYPE).map(function (res) {
        return /*#__PURE__*/_react.default.createElement(Item, {
          key: res.fullName || res.title
        }, /*#__PURE__*/_react.default.createElement(_Result.default, res));
      }) : /*#__PURE__*/_react.default.createElement(_components.Placeholder, {
        key: "no-tests-".concat(StatusTypes.PENDING_TYPE)
      }, "This story has no pending tests."))), /*#__PURE__*/_react.default.createElement("div", {
        id: "todo-tests",
        title: "".concat(testsByType.get(StatusTypes.TODO_TYPE) ? testsByType.get(StatusTypes.TODO_TYPE).length : 0, " Todo"),
        color: getColorByType(StatusTypes.TODO_TYPE)
      }, /*#__PURE__*/_react.default.createElement(List, null, testsByType.get(StatusTypes.TODO_TYPE) ? testsByType.get(StatusTypes.TODO_TYPE).map(function (res) {
        return /*#__PURE__*/_react.default.createElement(Item, {
          key: res.fullName || res.title
        }, /*#__PURE__*/_react.default.createElement(_Result.default, res));
      }) : /*#__PURE__*/_react.default.createElement(_components.Placeholder, {
        key: "no-tests-".concat(StatusTypes.TODO_TYPE)
      }, "This story has no tests todo.")))));
    });
  }));
})({
  flex: '1 1 0%'
});

var Panel = function Panel(_ref7) {
  var tests = _ref7.tests;
  return /*#__PURE__*/_react.default.createElement(_components.ScrollArea, {
    vertical: true
  }, tests ? /*#__PURE__*/_react.default.createElement(Content, {
    tests: tests
  }) : /*#__PURE__*/_react.default.createElement(_components.Placeholder, null, /*#__PURE__*/_react.default.createElement(_react.Fragment, null, "No tests found"), /*#__PURE__*/_react.default.createElement(_react.Fragment, null, "Learn how to\xA0", /*#__PURE__*/_react.default.createElement(_components.Link, {
    href: "https://github.com/storybookjs/storybook/tree/master/addons/jest",
    target: "_blank",
    withArrow: true
  }, "add Jest test results to your story"))));
};

Panel.defaultProps = {
  tests: null
};

var _default = (0, _provideJestResult.default)(Panel);

exports.default = _default;