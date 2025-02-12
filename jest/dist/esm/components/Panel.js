function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.map.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/web.dom-collections.for-each.js";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.sort.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.regexp.exec.js";
import React, { Fragment } from 'react';
import { styled, themes, convert } from '@storybook/theming';
import { ScrollArea, TabsState, Link, Placeholder } from '@storybook/components';
import { SizeMe } from 'react-sizeme';
import Result from './Result';
import provideJestResult from '../hoc/provideJestResult';
var StatusTypes = {
  PASSED_TYPE: 'passed',
  FAILED_TYPE: 'failed',
  PENDING_TYPE: 'pending',
  TODO_TYPE: 'todo'
};
var List = styled.ul({
  listStyle: 'none',
  fontSize: 14,
  padding: 0,
  margin: 0
});
var Item = styled.li({
  display: 'block',
  padding: 0
});
var ProgressWrapper = styled.div({
  position: 'relative',
  height: 10,
  width: 30,
  display: 'flex',
  top: -2
});
var SuiteHead = styled.div({
  display: 'flex',
  alignItems: 'baseline',
  position: 'absolute',
  zIndex: 2,
  right: 20,
  marginTop: 15
});
var SuiteTotals = styled(function (_ref) {
  var result = _ref.result,
      className = _ref.className,
      width = _ref.width;
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, /*#__PURE__*/React.createElement(Fragment, null, width > 325 && result.assertionResults ? /*#__PURE__*/React.createElement("div", null, result.assertionResults.length, " ", result.assertionResults.length > 1 ? "tests" : "test") : null, width > 280 && result.endTime && result.startTime ? /*#__PURE__*/React.createElement("div", null, result.endTime - result.startTime, "ms") : null));
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
var SuiteProgressPortion = styled.div(function (_ref3) {
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
      return convert(themes.normal).color.positive;

    case StatusTypes.FAILED_TYPE:
      return convert(themes.normal).color.negative;

    case StatusTypes.PENDING_TYPE:
      return convert(themes.normal).color.warning;

    case StatusTypes.TODO_TYPE:
      return convert(themes.normal).color.purple;

    default:
      return null;
  }
};

var Content = styled(function (_ref4) {
  var tests = _ref4.tests,
      className = _ref4.className;
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, tests.map(function (_ref5) {
    var name = _ref5.name,
        result = _ref5.result;

    if (!result || !result.assertionResults) {
      return /*#__PURE__*/React.createElement(Placeholder, {
        key: name
      }, "This story has tests configured, but no file was found");
    }

    var testsByType = getTestsByTypeMap(result);
    var entries = testsByType.entries();

    var sortedTestsByCount = _toConsumableArray(entries).sort(function (a, b) {
      return a[1].length - b[1].length;
    });

    return /*#__PURE__*/React.createElement(SizeMe, {
      refreshMode: "debounce",
      key: name
    }, function (_ref6) {
      var size = _ref6.size;
      var width = size.width;
      return /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement(SuiteHead, null, /*#__PURE__*/React.createElement(SuiteTotals, {
        result: result,
        width: width
      }), width > 240 ? /*#__PURE__*/React.createElement(ProgressWrapper, null, sortedTestsByCount.map(function (entry) {
        return /*#__PURE__*/React.createElement(SuiteProgressPortion, {
          key: "progress-portion-".concat(entry[0]),
          color: getColorByType(entry[0]),
          progressPercent: entry[1] ? entry[1].length / result.assertionResults.length * 100 : 0
        });
      })) : null), /*#__PURE__*/React.createElement(TabsState, {
        initial: "failing-tests",
        backgroundColor: convert(themes.normal).background.hoverable
      }, /*#__PURE__*/React.createElement("div", {
        id: "failing-tests",
        title: "".concat(testsByType.get(StatusTypes.FAILED_TYPE) ? testsByType.get(StatusTypes.FAILED_TYPE).length : 0, " Failed"),
        color: getColorByType(StatusTypes.FAILED_TYPE)
      }, /*#__PURE__*/React.createElement(List, null, testsByType.get(StatusTypes.FAILED_TYPE) ? testsByType.get(StatusTypes.FAILED_TYPE).map(function (res) {
        return /*#__PURE__*/React.createElement(Item, {
          key: res.fullName || res.title
        }, /*#__PURE__*/React.createElement(Result, res));
      }) : /*#__PURE__*/React.createElement(Placeholder, {
        key: "no-tests-".concat(StatusTypes.FAILED_TYPE)
      }, "This story has no failing tests."))), /*#__PURE__*/React.createElement("div", {
        id: "passing-tests",
        title: "".concat(testsByType.get(StatusTypes.PASSED_TYPE) ? testsByType.get(StatusTypes.PASSED_TYPE).length : 0, " Passed"),
        color: getColorByType(StatusTypes.PASSED_TYPE)
      }, /*#__PURE__*/React.createElement(List, null, testsByType.get(StatusTypes.PASSED_TYPE) ? testsByType.get(StatusTypes.PASSED_TYPE).map(function (res) {
        return /*#__PURE__*/React.createElement(Item, {
          key: res.fullName || res.title
        }, /*#__PURE__*/React.createElement(Result, res));
      }) : /*#__PURE__*/React.createElement(Placeholder, {
        key: "no-tests-".concat(StatusTypes.PASSED_TYPE)
      }, "This story has no passing tests."))), /*#__PURE__*/React.createElement("div", {
        id: "pending-tests",
        title: "".concat(testsByType.get(StatusTypes.PENDING_TYPE) ? testsByType.get(StatusTypes.PENDING_TYPE).length : 0, " Pending"),
        color: getColorByType(StatusTypes.PENDING_TYPE)
      }, /*#__PURE__*/React.createElement(List, null, testsByType.get(StatusTypes.PENDING_TYPE) ? testsByType.get(StatusTypes.PENDING_TYPE).map(function (res) {
        return /*#__PURE__*/React.createElement(Item, {
          key: res.fullName || res.title
        }, /*#__PURE__*/React.createElement(Result, res));
      }) : /*#__PURE__*/React.createElement(Placeholder, {
        key: "no-tests-".concat(StatusTypes.PENDING_TYPE)
      }, "This story has no pending tests."))), /*#__PURE__*/React.createElement("div", {
        id: "todo-tests",
        title: "".concat(testsByType.get(StatusTypes.TODO_TYPE) ? testsByType.get(StatusTypes.TODO_TYPE).length : 0, " Todo"),
        color: getColorByType(StatusTypes.TODO_TYPE)
      }, /*#__PURE__*/React.createElement(List, null, testsByType.get(StatusTypes.TODO_TYPE) ? testsByType.get(StatusTypes.TODO_TYPE).map(function (res) {
        return /*#__PURE__*/React.createElement(Item, {
          key: res.fullName || res.title
        }, /*#__PURE__*/React.createElement(Result, res));
      }) : /*#__PURE__*/React.createElement(Placeholder, {
        key: "no-tests-".concat(StatusTypes.TODO_TYPE)
      }, "This story has no tests todo.")))));
    });
  }));
})({
  flex: '1 1 0%'
});

var Panel = function Panel(_ref7) {
  var tests = _ref7.tests;
  return /*#__PURE__*/React.createElement(ScrollArea, {
    vertical: true
  }, tests ? /*#__PURE__*/React.createElement(Content, {
    tests: tests
  }) : /*#__PURE__*/React.createElement(Placeholder, null, /*#__PURE__*/React.createElement(Fragment, null, "No tests found"), /*#__PURE__*/React.createElement(Fragment, null, "Learn how to\xA0", /*#__PURE__*/React.createElement(Link, {
    href: "https://github.com/storybookjs/storybook/tree/master/addons/jest",
    target: "_blank",
    withArrow: true
  }, "add Jest test results to your story"))));
};

Panel.defaultProps = {
  tests: null
};
export default provideJestResult(Panel);