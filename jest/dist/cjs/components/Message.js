"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Message = void 0;

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.array.join.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.string.trim.js");

require("core-js/modules/es.array.filter.js");

var _react = _interopRequireWildcard(require("react"));

var _theming = require("@storybook/theming");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var positiveConsoleRegex = /\[32m(.*?)\[39m/;
var negativeConsoleRegex = /\[31m(.*?)\[39m/;
var positiveType = 'positive';
var negativeType = 'negative';
var endToken = '[39m';
var failStartToken = '[31m';
var passStartToken = '[32m';
var stackTraceStartToken = 'at';
var titleEndToken = ':';

var TestDetail = /*#__PURE__*/_createClass(function TestDetail() {
  _classCallCheck(this, TestDetail);

  this.description = void 0;
  this.result = void 0;
  this.stackTrace = void 0;
});

var StackTrace = _theming.styled.pre(function (_ref) {
  var theme = _ref.theme;
  return {
    background: theme.color.lighter,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 6,
    borderRadius: 2,
    overflow: 'auto',
    margin: '10px 30px 10px 30px',
    whiteSpace: 'pre'
  };
});

var Results = _theming.styled.div({
  paddingTop: 10,
  marginLeft: 31,
  marginRight: 30
});

var Description = _theming.styled.div(function (_ref2) {
  var theme = _ref2.theme;
  return {
    paddingBottom: 10,
    paddingTop: 10,
    borderBottom: theme.appBorderColor,
    marginLeft: 31,
    marginRight: 30,
    overflowWrap: 'break-word'
  };
});

var StatusColor = _theming.styled.strong(function (_ref3) {
  var status = _ref3.status,
      theme = _ref3.theme;
  return {
    color: status === positiveType ? theme.color.positive : theme.color.negative,
    fontWeight: 500
  };
});

var colorizeText = function colorizeText(msg, type) {
  if (type) {
    return msg.split(type === positiveType ? positiveConsoleRegex : negativeConsoleRegex).map(function (i, index) {
      return index % 2 ? /*#__PURE__*/_react.default.createElement(StatusColor, {
        key: "".concat(type, "_").concat(i),
        status: type
      }, i) : i;
    });
  }

  return [msg];
};

var getConvertedText = function getConvertedText(msg) {
  var elementArray = [];
  if (!msg) return elementArray;
  var splitText = msg.split(/\[2m/).join('').split(/\[22m/);
  splitText.forEach(function (element) {
    if (element && element.trim()) {
      if (element.indexOf(failStartToken) > -1 && element.indexOf(failStartToken) < element.indexOf(endToken)) {
        elementArray = elementArray.concat(colorizeText(element, negativeType));
      } else if (element.indexOf(passStartToken) > -1 && element.indexOf(passStartToken) < element.indexOf(endToken)) {
        elementArray = elementArray.concat(colorizeText(element, positiveType));
      } else {
        elementArray = elementArray.concat(element);
      }
    }
  });
  return elementArray;
};

var getTestDetail = function getTestDetail(msg) {
  var lines = msg.split('\n').filter(Boolean);
  var testDetail = new TestDetail();
  testDetail.description = getConvertedText(lines[0]);
  testDetail.stackTrace = '';
  testDetail.result = [];

  for (var index = 1; index < lines.length; index += 1) {
    var current = lines[index];
    var next = lines[index + 1];

    if (current.trim().toLowerCase().indexOf(stackTraceStartToken) === 0) {
      testDetail.stackTrace += "".concat(current.trim(), "\n");
    } else if (current.trim().indexOf(titleEndToken) > -1) {
      var title = void 0;
      var value = null;

      if (current.trim().indexOf(titleEndToken) === current.length - 1) {
        // there are breaks in the middle of result
        title = current.trim();
        value = getConvertedText(next);
        index += 1;
      } else {
        // results come in a single line
        title = current.substring(0, current.indexOf(titleEndToken)).trim();
        value = getConvertedText(current.substring(current.indexOf(titleEndToken), current.length));
      }

      testDetail.result = [].concat(_toConsumableArray(testDetail.result), [title, ' '], _toConsumableArray(value), [/*#__PURE__*/_react.default.createElement("br", {
        key: index
      })]);
    } else {
      // results come in an unexpected format
      testDetail.result = [].concat(_toConsumableArray(testDetail.result), [' '], _toConsumableArray(getConvertedText(current)));
    }
  }

  return testDetail;
};

var Message = function Message(props) {
  var msg = props.msg;
  var detail = getTestDetail(msg);
  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, detail.description ? /*#__PURE__*/_react.default.createElement(Description, null, detail.description) : null, detail.result ? /*#__PURE__*/_react.default.createElement(Results, null, detail.result) : null, detail.stackTrace ? /*#__PURE__*/_react.default.createElement(StackTrace, null, detail.stackTrace) : null);
};

exports.Message = Message;
var _default = Message;
exports.default = _default;