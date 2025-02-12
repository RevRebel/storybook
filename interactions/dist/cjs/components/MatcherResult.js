"use strict";

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.from.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Received = exports.MatcherResult = exports.Expected = void 0;

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.string.starts-with.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.array.flat-map.js");

require("core-js/modules/es.array.unscopables.flat-map.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.match.js");

require("core-js/modules/es.number.constructor.js");

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

var _MethodCall = require("./MethodCall");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var getParams = function getParams(line) {
  var fromIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  for (var i = fromIndex, depth = 1; i < line.length; i += 1) {
    if (line[i] === '(') depth += 1;else if (line[i] === ')') depth -= 1;
    if (depth === 0) return line.slice(fromIndex, i);
  }

  return '';
};

var parseValue = function parseValue(value) {
  try {
    return value === 'undefined' ? undefined : JSON.parse(value);
  } catch (e) {
    return value;
  }
};

var StyledExpected = _theming.styled.span(function (_ref) {
  var theme = _ref.theme;
  return {
    color: theme.color.positive
  };
});

var StyledReceived = _theming.styled.span(function (_ref2) {
  var theme = _ref2.theme;
  return {
    color: theme.color.negative
  };
});

var Received = function Received(_ref3) {
  var value = _ref3.value,
      parsed = _ref3.parsed;
  return parsed ? /*#__PURE__*/_react.default.createElement(_MethodCall.Node, {
    value: value,
    style: {
      color: '#D43900'
    }
  }) : /*#__PURE__*/_react.default.createElement(StyledReceived, null, value);
};

exports.Received = Received;

var Expected = function Expected(_ref4) {
  var value = _ref4.value,
      parsed = _ref4.parsed;

  if (parsed) {
    if (typeof value === 'string' && value.startsWith('called with')) return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, value);
    return /*#__PURE__*/_react.default.createElement(_MethodCall.Node, {
      value: value,
      style: {
        color: '#16B242'
      }
    });
  }

  return /*#__PURE__*/_react.default.createElement(StyledExpected, null, value);
};

exports.Expected = Expected;

var MatcherResult = function MatcherResult(_ref5) {
  var message = _ref5.message;
  var lines = message.split('\n');
  return /*#__PURE__*/_react.default.createElement("pre", {
    style: {
      margin: 0,
      padding: '8px 10px 8px 30px',
      fontSize: _theming.typography.size.s1
    }
  }, lines.flatMap(function (line, index) {
    if (line.startsWith('expect(')) {
      var received = getParams(line, 7);
      var remainderIndex = received && 7 + received.length;
      var matcher = received && line.slice(remainderIndex).match(/\.(to|last|nth)[A-Z]\w+\(/);

      if (matcher) {
        var expectedIndex = remainderIndex + matcher.index + matcher[0].length;
        var expected = getParams(line, expectedIndex);

        if (expected) {
          return ['expect(', /*#__PURE__*/_react.default.createElement(Received, {
            key: "received_".concat(received),
            value: received
          }), line.slice(remainderIndex, expectedIndex), /*#__PURE__*/_react.default.createElement(Expected, {
            key: "expected_".concat(expected),
            value: expected
          }), line.slice(expectedIndex + expected.length), /*#__PURE__*/_react.default.createElement("br", {
            key: "br".concat(index)
          })];
        }
      }
    }

    if (line.match(/^\s*- /)) {
      return [/*#__PURE__*/_react.default.createElement(Expected, {
        key: line + index,
        value: line
      }), /*#__PURE__*/_react.default.createElement("br", {
        key: "br".concat(index)
      })];
    }

    if (line.match(/^\s*\+ /)) {
      return [/*#__PURE__*/_react.default.createElement(Received, {
        key: line + index,
        value: line
      }), /*#__PURE__*/_react.default.createElement("br", {
        key: "br".concat(index)
      })];
    }

    var _ref6 = line.match(/^(Expected|Received): (.*)$/) || [],
        _ref7 = _slicedToArray(_ref6, 3),
        assertionLabel = _ref7[1],
        assertionValue = _ref7[2];

    if (assertionLabel && assertionValue) {
      return assertionLabel === 'Expected' ? ['Expected: ', /*#__PURE__*/_react.default.createElement(Expected, {
        key: line + index,
        value: parseValue(assertionValue),
        parsed: true
      }), /*#__PURE__*/_react.default.createElement("br", {
        key: "br".concat(index)
      })] : ['Received: ', /*#__PURE__*/_react.default.createElement(Received, {
        key: line + index,
        value: parseValue(assertionValue),
        parsed: true
      }), /*#__PURE__*/_react.default.createElement("br", {
        key: "br".concat(index)
      })];
    }

    var _ref8 = line.match(/(Expected number|Received number|Number) of calls: (\d+)$/i) || [],
        _ref9 = _slicedToArray(_ref8, 3),
        prefix = _ref9[1],
        numberOfCalls = _ref9[2];

    if (prefix && numberOfCalls) {
      return ["".concat(prefix, " of calls: "), /*#__PURE__*/_react.default.createElement(_MethodCall.Node, {
        key: line + index,
        value: Number(numberOfCalls)
      }), /*#__PURE__*/_react.default.createElement("br", {
        key: "br".concat(index)
      })];
    }

    var _ref10 = line.match(/^Received has value: (.+)$/) || [],
        _ref11 = _slicedToArray(_ref10, 2),
        receivedValue = _ref11[1];

    if (receivedValue) {
      return ['Received has value: ', /*#__PURE__*/_react.default.createElement(_MethodCall.Node, {
        key: line + index,
        value: parseValue(receivedValue)
      }), /*#__PURE__*/_react.default.createElement("br", {
        key: "br".concat(index)
      })];
    }

    return [/*#__PURE__*/_react.default.createElement("span", {
      key: line + index
    }, line), /*#__PURE__*/_react.default.createElement("br", {
      key: "br".concat(index)
    })];
  }));
};

exports.MatcherResult = MatcherResult;